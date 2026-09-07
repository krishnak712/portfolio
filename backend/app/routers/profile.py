from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.profile import Profile
from app.schemas.profile import (
    ProfileCreate,
    ProfileUpdate,
    ProfileResponse,
)


router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


@router.get(
    "",
    response_model=ProfileResponse
)
def get_profile(db: Session = Depends(get_db)):

    profile = db.query(Profile).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

    return profile


@router.post(
    "",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED
)
def create_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db)
):

    existing_profile = db.query(Profile).first()

    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile already exists"
        )

    profile = Profile(
        **profile_data.model_dump()
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


@router.put(
    "",
    response_model=ProfileResponse
)
def update_profile(
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

    update_data = profile_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)

    return profile