from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.project_section import ProjectSection
from app.schemas.project_section import (
    ProjectSectionCreate,
    ProjectSectionUpdate,
    ProjectSectionResponse,
)


router = APIRouter(
    prefix="/api/project-sections",
    tags=["Project Sections"]
)


@router.get(
    "/project/{project_id}",
    response_model=list[ProjectSectionResponse]
)
def get_project_sections(
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
        db.query(ProjectSection)
        .filter(
            ProjectSection.project_id == project_id
        )
        .order_by(
            ProjectSection.display_order.asc(),
            ProjectSection.id.asc()
        )
        .all()
    )


@router.get(
    "/{section_id}",
    response_model=ProjectSectionResponse
)
def get_project_section(
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

    return section


@router.post(
    "",
    response_model=ProjectSectionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_project_section(
    section_data: ProjectSectionCreate,
    db: Session = Depends(get_db)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == section_data.project_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    section = ProjectSection(
        **section_data.model_dump()
    )

    db.add(section)
    db.commit()
    db.refresh(section)

    return section


@router.put(
    "/{section_id}",
    response_model=ProjectSectionResponse
)
def update_project_section(
    section_id: int,
    section_data: ProjectSectionUpdate,
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

    update_data = section_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(section, field, value)

    db.commit()
    db.refresh(section)

    return section


@router.delete(
    "/{section_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_project_section(
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

    db.delete(section)
    db.commit()

    return None