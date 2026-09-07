from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class ExperienceBase(BaseModel):
    company: str
    position: str
    location: str | None = None

    start_date: date
    end_date: date | None = None

    description: str | None = None

    display_order: int = 0


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    location: str | None = None

    start_date: date | None = None
    end_date: date | None = None

    description: str | None = None

    display_order: int | None = None


class ExperienceResponse(ExperienceBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )