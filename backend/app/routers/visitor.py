from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    status,
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.visitor import Visitor

from app.schemas.visitor import (
    VisitorCreate,
    VisitorUpdate,
    VisitorResponse,
    VisitorLocationUpdate,
)

from geopy.geocoders import Nominatim


router = APIRouter(
    prefix="/api/visitors",
    tags=["Visitors"],
)


@router.post(
    "",
    response_model=VisitorResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_visitor(
    visitor_data: VisitorCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    # -----------------------------------------
    # Get visitor IP address
    # -----------------------------------------

    forwarded_for = request.headers.get("x-forwarded-for")

    if forwarded_for:
        ip_address = forwarded_for.split(",")[0].strip()
    else:
        ip_address = (
            request.client.host
            if request.client
            else None
        )

    # -----------------------------------------
    # Check existing visitor BY IP
    # -----------------------------------------

    existing_visitor = None

    if ip_address:
        existing_visitor = (
            db.query(Visitor)
            .filter(
                Visitor.ip_address == ip_address
            )
            .first()
        )

    # -----------------------------------------
    # Existing IP → update existing visitor
    # -----------------------------------------

    if existing_visitor:

        existing_visitor.visit_count += 1

        existing_visitor.last_visit_at = (
            datetime.now(timezone.utc)
        )

        # Update visitor information when available

        if visitor_data.country:
            existing_visitor.country = (
                visitor_data.country
            )

        if visitor_data.city:
            existing_visitor.city = (
                visitor_data.city
            )

        if visitor_data.device_type:
            existing_visitor.device_type = (
                visitor_data.device_type
            )

        if visitor_data.browser:
            existing_visitor.browser = (
                visitor_data.browser
            )

        if visitor_data.operating_system:
            existing_visitor.operating_system = (
                visitor_data.operating_system
            )

        if visitor_data.referrer:
            existing_visitor.referrer = (
                visitor_data.referrer
            )

        db.commit()
        db.refresh(existing_visitor)

        return existing_visitor

    # -----------------------------------------
    # New IP → create new visitor
    # -----------------------------------------

    visitor = Visitor(
        **visitor_data.model_dump(
            exclude={"visitor_id"}
        )
    )

    if visitor_data.visitor_id:
        visitor.visitor_id = (
            visitor_data.visitor_id
        )

    visitor.ip_address = ip_address

    db.add(visitor)
    db.commit()
    db.refresh(visitor)

    return visitor


@router.get(
    "",
    response_model=list[VisitorResponse],
)
def get_visitors(
    db: Session = Depends(get_db),
):
    return (
        db.query(Visitor)
        .order_by(
            Visitor.last_visit_at.desc()
        )
        .all()
    )


@router.get(
    "/{visitor_id}",
    response_model=VisitorResponse,
)
def get_visitor(
    visitor_id: str,
    db: Session = Depends(get_db),
):

    visitor = (
        db.query(Visitor)
        .filter(
            Visitor.visitor_id == visitor_id
        )
        .first()
    )

    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found",
        )

    return visitor


@router.put(
    "/{visitor_id}",
    response_model=VisitorResponse,
)
def update_visitor(
    visitor_id: str,
    visitor_data: VisitorUpdate,
    db: Session = Depends(get_db),
):

    visitor = (
        db.query(Visitor)
        .filter(
            Visitor.visitor_id == visitor_id
        )
        .first()
    )

    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found",
        )

    update_data = visitor_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(visitor, field, value)

    visitor.last_visit_at = datetime.now(
        timezone.utc
    )

    db.commit()
    db.refresh(visitor)

    return visitor


@router.patch("/location")
def update_visitor_location(
    location_data: VisitorLocationUpdate,
    db: Session = Depends(get_db),
):
    visitor = (
        db.query(Visitor)
        .filter(
            Visitor.visitor_id
            == location_data.visitor_id
        )
        .first()
    )

    if not visitor:
        raise HTTPException(
            status_code=404,
            detail="Visitor not found",
        )

    try:
        geolocator = Nominatim(
            user_agent="portfolio-analytics"
        )

        location = geolocator.reverse(
            (
                location_data.latitude,
                location_data.longitude,
            ),
            exactly_one=True,
            language="en",
        )

        if location and location.raw:

            address = location.raw.get(
                "address",
                {},
            )

            visitor.country = address.get(
                "country"
            )

            visitor.city = (
                address.get("city")
                or address.get("town")
                or address.get("village")
                or address.get("municipality")
            )

            db.commit()
            db.refresh(visitor)

    except Exception as error:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Location lookup failed: {str(error)}",
        )

    return {
        "message": "Visitor location updated",
        "country": visitor.country,
        "city": visitor.city,
    }