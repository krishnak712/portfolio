from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.achievement import Achievement
from app.schemas.achievement import (
    AchievementCreate,
    AchievementUpdate,
    AchievementResponse,
)


router = APIRouter(
    prefix="/api/achievements",
    tags=["Achievements"]
)


@router.get(
    "",
    response_model=list[AchievementResponse]
)
def get_achievements(
    db: Session = Depends(get_db)
):
    return (
        db.query(Achievement)
        .order_by(
            Achievement.display_order.asc(),
            Achievement.date.desc().nullslast(),
            Achievement.id.asc()
        )
        .all()
    )


@router.get(
    "/{achievement_id}",
    response_model=AchievementResponse
)
def get_achievement(
    achievement_id: int,
    db: Session = Depends(get_db)
):

    achievement = (
        db.query(Achievement)
        .filter(
            Achievement.id == achievement_id
        )
        .first()
    )

    if not achievement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Achievement not found"
        )

    return achievement


@router.post(
    "",
    response_model=AchievementResponse,
    status_code=status.HTTP_201_CREATED
)
def create_achievement(
    achievement_data: AchievementCreate,
    db: Session = Depends(get_db)
):

    achievement = Achievement(
        **achievement_data.model_dump()
    )

    db.add(achievement)
    db.commit()
    db.refresh(achievement)

    return achievement


@router.put(
    "/{achievement_id}",
    response_model=AchievementResponse
)
def update_achievement(
    achievement_id: int,
    achievement_data: AchievementUpdate,
    db: Session = Depends(get_db)
):

    achievement = (
        db.query(Achievement)
        .filter(
            Achievement.id == achievement_id
        )
        .first()
    )

    if not achievement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Achievement not found"
        )

    update_data = achievement_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(achievement, field, value)

    db.commit()
    db.refresh(achievement)

    return achievement


@router.delete(
    "/{achievement_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_achievement(
    achievement_id: int,
    db: Session = Depends(get_db)
):

    achievement = (
        db.query(Achievement)
        .filter(
            Achievement.id == achievement_id
        )
        .first()
    )

    if not achievement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Achievement not found"
        )

    db.delete(achievement)
    db.commit()

    return None