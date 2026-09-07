from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.visitor import Visitor
from app.schemas.visitor import (
    VisitorCreate,
    VisitorUpdate,
    VisitorResponse,
)
from geopy.geocoders import Nominatim
from app.schemas.visitor import VisitorLocationUpdate

router = APIRouter(
    prefix="/api/visitors",
    tags=["Visitors"]
)


@router.post(
    "",
    response_model=VisitorResponse,
    status_code=status.HTTP_201_CREATED
)
def create_visitor(
    visitor_data: VisitorCreate,
    db: Session = Depends(get_db)
):

    if visitor_data.visitor_id:

        existing_visitor = (
            db.query(Visitor)
            .filter(
                Visitor.visitor_id
                == visitor_data.visitor_id
            )
            .first()
        )

        if existing_visitor:

            existing_visitor.visit_count += 1
            existing_visitor.last_visit_at = (
                datetime.now(timezone.utc)
            )

            db.commit()
            db.refresh(existing_visitor)

            return existing_visitor

    visitor = Visitor(
        **visitor_data.model_dump(
            exclude={"visitor_id"}
        )
    )

    if visitor_data.visitor_id:
        visitor.visitor_id = visitor_data.visitor_id

    db.add(visitor)
    db.commit()
    db.refresh(visitor)

    return visitor


@router.get(
    "",
    response_model=list[VisitorResponse]
)
def get_visitors(
    db: Session = Depends(get_db)
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
    response_model=VisitorResponse
)
def get_visitor(
    visitor_id: str,
    db: Session = Depends(get_db)
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
            detail="Visitor not found"
        )

    return visitor


@router.put(
    "/{visitor_id}",
    response_model=VisitorResponse
)
def update_visitor(
    visitor_id: str,
    visitor_data: VisitorUpdate,
    db: Session = Depends(get_db)
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
            detail="Visitor not found"
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
            Visitor.visitor_id == location_data.visitor_id
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
                {}
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