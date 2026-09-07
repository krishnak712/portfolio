from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.experience import Experience
from app.schemas.experience import (
    ExperienceCreate,
    ExperienceUpdate,
    ExperienceResponse,
)


router = APIRouter(
    prefix="/api/experience",
    tags=["Experience"]
)


@router.get(
    "",
    response_model=list[ExperienceResponse]
)
def get_experience(
    db: Session = Depends(get_db)
):
    return (
        db.query(Experience)
        .order_by(
            Experience.display_order.asc(),
            Experience.start_date.desc()
        )
        .all()
    )


@router.get(
    "/{experience_id}",
    response_model=ExperienceResponse
)
def get_experience_by_id(
    experience_id: int,
    db: Session = Depends(get_db)
):

    experience = (
        db.query(Experience)
        .filter(
            Experience.id == experience_id
        )
        .first()
    )

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found"
        )

    return experience


@router.post(
    "",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED
)
def create_experience(
    experience_data: ExperienceCreate,
    db: Session = Depends(get_db)
):

    experience = Experience(
        **experience_data.model_dump()
    )

    db.add(experience)
    db.commit()
    db.refresh(experience)

    return experience


@router.put(
    "/{experience_id}",
    response_model=ExperienceResponse
)
def update_experience(
    experience_id: int,
    experience_data: ExperienceUpdate,
    db: Session = Depends(get_db)
):

    experience = (
        db.query(Experience)
        .filter(
            Experience.id == experience_id
        )
        .first()
    )

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found"
        )

    update_data = experience_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(experience, field, value)

    db.commit()
    db.refresh(experience)

    return experience


@router.delete(
    "/{experience_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db)
):

    experience = (
        db.query(Experience)
        .filter(
            Experience.id == experience_id
        )
        .first()
    )

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found"
        )

    db.delete(experience)
    db.commit()

    return None