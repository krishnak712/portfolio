from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.skill import Skill
from app.schemas.skill import (
    SkillCreate,
    SkillUpdate,
    SkillResponse,
)


router = APIRouter(
    prefix="/api/skills",
    tags=["Skills"]
)


@router.get(
    "",
    response_model=list[SkillResponse]
)
def get_skills(
    db: Session = Depends(get_db)
):
    return (
        db.query(Skill)
        .order_by(
            Skill.display_order.asc(),
            Skill.id.asc()
        )
        .all()
    )


@router.get(
    "/{skill_id}",
    response_model=SkillResponse
)
def get_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):

    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    return skill


@router.post(
    "",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED
)
def create_skill(
    skill_data: SkillCreate,
    db: Session = Depends(get_db)
):

    skill = Skill(
        **skill_data.model_dump()
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill


@router.put(
    "/{skill_id}",
    response_model=SkillResponse
)
def update_skill(
    skill_id: int,
    skill_data: SkillUpdate,
    db: Session = Depends(get_db)
):

    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    update_data = skill_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(skill, field, value)

    db.commit()
    db.refresh(skill)

    return skill


@router.delete(
    "/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):

    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    db.delete(skill)
    db.commit()

    return None