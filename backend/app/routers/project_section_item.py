from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project_section import ProjectSection
from app.models.project_section_item import ProjectSectionItem
from app.schemas.project_section_item import (
    ProjectSectionItemCreate,
    ProjectSectionItemUpdate,
    ProjectSectionItemResponse,
)


router = APIRouter(
    prefix="/api/project-section-items",
    tags=["Project Section Items"]
)


@router.get(
    "/section/{section_id}",
    response_model=list[ProjectSectionItemResponse]
)
def get_section_items(
    section_id: int,
    db: Session = Depends(get_db)
):

    section = (
        db.query(ProjectSection)
        .filter(
            ProjectSection.id == section_id
        )
        .first()
    )

    if not section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project section not found"
        )

    return (
        db.query(ProjectSectionItem)
        .filter(
            ProjectSectionItem.section_id == section_id
        )
        .order_by(
            ProjectSectionItem.display_order.asc(),
            ProjectSectionItem.id.asc()
        )
        .all()
    )


@router.get(
    "/{item_id}",
    response_model=ProjectSectionItemResponse
)
def get_section_item(
    item_id: int,
    db: Session = Depends(get_db)
):

    item = (
        db.query(ProjectSectionItem)
        .filter(
            ProjectSectionItem.id == item_id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project section item not found"
        )

    return item


@router.post(
    "",
    response_model=ProjectSectionItemResponse,
    status_code=status.HTTP_201_CREATED
)
def create_section_item(
    item_data: ProjectSectionItemCreate,
    db: Session = Depends(get_db)
):

    section = (
        db.query(ProjectSection)
        .filter(
            ProjectSection.id == item_data.section_id
        )
        .first()
    )

    if not section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project section not found"
        )

    item = ProjectSectionItem(
        **item_data.model_dump()
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.put(
    "/{item_id}",
    response_model=ProjectSectionItemResponse
)
def update_section_item(
    item_id: int,
    item_data: ProjectSectionItemUpdate,
    db: Session = Depends(get_db)
):

    item = (
        db.query(ProjectSectionItem)
        .filter(
            ProjectSectionItem.id == item_id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project section item not found"
        )

    update_data = item_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)

    return item


@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_section_item(
    item_id: int,
    db: Session = Depends(get_db)
):

    item = (
        db.query(ProjectSectionItem)
        .filter(
            ProjectSectionItem.id == item_id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project section item not found"
        )

    db.delete(item)
    db.commit()

    return None