from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
)


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


@router.get(
    "",
    response_model=list[ProjectResponse]
)
def get_projects(
    db: Session = Depends(get_db)
):
    return (
        db.query(Project)
        .order_by(
            Project.display_order.asc(),
            Project.id.asc()
        )
        .all()
    )


@router.get(
    "/featured",
    response_model=list[ProjectResponse]
)
def get_featured_projects(
    db: Session = Depends(get_db)
):
    return (
        db.query(Project)
        .filter(Project.featured == True)
        .order_by(
            Project.display_order.asc()
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=ProjectResponse
)
def get_project(
    slug: str,
    db: Session = Depends(get_db)
):

    project = (
        db.query(Project)
        .filter(Project.slug == slug)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    return project


@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db)
):

    existing_project = (
        db.query(Project)
        .filter(Project.slug == project_data.slug)
        .first()
    )

    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project slug already exists"
        )

    project = Project(
        **project_data.model_dump()
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


@router.put(
    "/{project_id}",
    response_model=ProjectResponse
)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
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

    update_data = project_data.model_dump(
        exclude_unset=True
    )

    if "slug" in update_data:
        existing_project = (
            db.query(Project)
            .filter(
                Project.slug == update_data["slug"],
                Project.id != project_id
            )
            .first()
        )

        if existing_project:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Project slug already exists"
            )

    for field, value in update_data.items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)

    return project


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_project(
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

    db.delete(project)
    db.commit()

    return None