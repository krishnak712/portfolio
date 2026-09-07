from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.project_detail import ProjectDetail
from app.schemas.project_detail import (
    ProjectDetailCreate,
    ProjectDetailUpdate,
    ProjectDetailResponse,
)


router = APIRouter(
    prefix="/api/project-details",
    tags=["Project Details"]
)


@router.get(
    "/{project_id}",
    response_model=ProjectDetailResponse
)
def get_project_detail(
    project_id: int,
    db: Session = Depends(get_db)
):

    detail = (
        db.query(ProjectDetail)
        .filter(
            ProjectDetail.project_id == project_id
        )
        .first()
    )

    if not detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project details not found"
        )

    return detail


@router.post(
    "",
    response_model=ProjectDetailResponse,
    status_code=status.HTTP_201_CREATED
)
def create_project_detail(
    detail_data: ProjectDetailCreate,
    db: Session = Depends(get_db)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == detail_data.project_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    existing_detail = (
        db.query(ProjectDetail)
        .filter(
            ProjectDetail.project_id
            == detail_data.project_id
        )
        .first()
    )

    if existing_detail:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project details already exist"
        )

    detail = ProjectDetail(
        **detail_data.model_dump()
    )

    db.add(detail)
    db.commit()
    db.refresh(detail)

    return detail


@router.put(
    "/{project_id}",
    response_model=ProjectDetailResponse
)
def update_project_detail(
    project_id: int,
    detail_data: ProjectDetailUpdate,
    db: Session = Depends(get_db)
):

    detail = (
        db.query(ProjectDetail)
        .filter(
            ProjectDetail.project_id == project_id
        )
        .first()
    )

    if not detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project details not found"
        )

    update_data = detail_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(detail, field, value)

    db.commit()
    db.refresh(detail)

    return detail


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_project_detail(
    project_id: int,
    db: Session = Depends(get_db)
):

    detail = (
        db.query(ProjectDetail)
        .filter(
            ProjectDetail.project_id == project_id
        )
        .first()
    )

    if not detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project details not found"
        )

    db.delete(detail)
    db.commit()

    return None