from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr


class ProfileBase(BaseModel):
    name: str
    role: str

    short_bio: str | None = None
    about: str | None = None

    email: EmailStr | None = None
    phone: str | None = None
    location: str | None = None

    profile_image: str | None = None
    resume_url: str | None = None

    github_url: str | None = None
    linkedin_url: str | None = None


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(BaseModel):
    name: str | None = None
    role: str | None = None

    short_bio: str | None = None
    about: str | None = None

    email: EmailStr | None = None
    phone: str | None = None
    location: str | None = None

    profile_image: str | None = None
    resume_url: str | None = None

    github_url: str | None = None
    linkedin_url: str | None = None


class ProfileResponse(ProfileBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)