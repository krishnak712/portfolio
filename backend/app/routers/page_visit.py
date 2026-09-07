from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.visitor import Visitor
from app.models.page_visit import PageVisit
from app.schemas.page_visit import (
    PageVisitCreate,
    PageVisitUpdate,
    PageVisitResponse,
)


router = APIRouter(
    prefix="/api/page-visits",
    tags=["Page Visits"]
)


@router.post(
    "",
    response_model=PageVisitResponse,
    status_code=status.HTTP_201_CREATED
)
def create_page_visit(
    visit_data: PageVisitCreate,
    db: Session = Depends(get_db)
):

    visitor = (
        db.query(Visitor)
        .filter(
            Visitor.id == visit_data.visitor_id
        )
        .first()
    )

    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found"
        )

    page_visit = PageVisit(
        **visit_data.model_dump()
    )

    db.add(page_visit)
    db.commit()
    db.refresh(page_visit)

    return page_visit


@router.get(
    "/visitor/{visitor_id}",
    response_model=list[PageVisitResponse]
)
def get_visitor_page_visits(
    visitor_id: int,
    db: Session = Depends(get_db)
):

    visitor = (
        db.query(Visitor)
        .filter(
            Visitor.id == visitor_id
        )
        .first()
    )

    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found"
        )

    return (
        db.query(PageVisit)
        .filter(
            PageVisit.visitor_id == visitor_id
        )
        .order_by(
            PageVisit.visited_at.desc()
        )
        .all()
    )


@router.get(
    "",
    response_model=list[PageVisitResponse]
)
def get_page_visits(
    db: Session = Depends(get_db)
):

    return (
        db.query(PageVisit)
        .order_by(
            PageVisit.visited_at.desc()
        )
        .all()
    )


@router.put(
    "/{visit_id}",
    response_model=PageVisitResponse
)
def update_page_visit(
    visit_id: int,
    visit_data: PageVisitUpdate,
    db: Session = Depends(get_db)
):

    page_visit = (
        db.query(PageVisit)
        .filter(
            PageVisit.id == visit_id
        )
        .first()
    )

    if not page_visit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page visit not found"
        )

    update_data = visit_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(page_visit, field, value)

    db.commit()
    db.refresh(page_visit)

    return page_visit


@router.delete(
    "/{visit_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_page_visit(
    visit_id: int,
    db: Session = Depends(get_db)
):

    page_visit = (
        db.query(PageVisit)
        .filter(
            PageVisit.id == visit_id
        )
        .first()
    )

    if not page_visit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page visit not found"
        )

    db.delete(page_visit)
    db.commit()

    return None