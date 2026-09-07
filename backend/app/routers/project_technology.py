from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.project_technology import ProjectTechnology
from app.schemas.project_technology import (
    ProjectTechnologyCreate,
    ProjectTechnologyUpdate,
    ProjectTechnologyResponse,
)


router = APIRouter(
    prefix="/api/project-technologies",
    tags=["Project Technologies"]
)


@router.get(
    "/project/{project_id}",
    response_model=list[ProjectTechnologyResponse]
)
def get_project_technologies(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    return (
        db.query(ProjectTechnology)
        .filter(
            ProjectTechnology.project_id == project_id
        )
        .order_by(
            ProjectTechnology.display_order.asc(),
            ProjectTechnology.id.asc()
        )
        .all()
    )


@router.post(
    "",
    response_model=ProjectTechnologyResponse,
    status_code=status.HTTP_201_CREATED
)
def create_project_technology(
    technology_data: ProjectTechnologyCreate,
    db: Session = Depends(get_db)
):
    project = (
        db.query(Project)
        .filter(
            Project.id == technology_data.project_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    existing = (
        db.query(ProjectTechnology)
        .filter(
            ProjectTechnology.project_id
            == technology_data.project_id,
            ProjectTechnology.technology
            == technology_data.technology
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Technology already exists for this project"
        )

    technology = ProjectTechnology(
        **technology_data.model_dump()
    )

    db.add(technology)
    db.commit()
    db.refresh(technology)

    return technology


@router.put(
    "/{technology_id}",
    response_model=ProjectTechnologyResponse
)
def update_project_technology(
    technology_id: int,
    technology_data: ProjectTechnologyUpdate,
    db: Session = Depends(get_db)
):
    technology = (
        db.query(ProjectTechnology)
        .filter(
            ProjectTechnology.id == technology_id
        )
        .first()
    )

    if not technology:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project technology not found"
        )

    update_data = technology_data.model_dump(
        exclude_unset=True
    )

    if "technology" in update_data:
        existing = (
            db.query(ProjectTechnology)
            .filter(
                ProjectTechnology.project_id
                == technology.project_id,
                ProjectTechnology.technology
                == update_data["technology"],
                ProjectTechnology.id
                != technology_id
            )
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Technology already exists for this project"
            )

    for field, value in update_data.items():
        setattr(technology, field, value)

    db.commit()
    db.refresh(technology)

    return technology


@router.delete(
    "/{technology_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_project_technology(
    technology_id: int,
    db: Session = Depends(get_db)
):
    technology = (
        db.query(ProjectTechnology)
        .filter(
            ProjectTechnology.id == technology_id
        )
        .first()
    )

    if not technology:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project technology not found"
        )

    db.delete(technology)
    db.commit()

    return None