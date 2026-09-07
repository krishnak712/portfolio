from datetime import date as Date
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AchievementBase(BaseModel):
    title: str
    description: str | None = None

    date: Date | None = None

    icon: str | None = None
    link: str | None = None

    display_order: int = 0


class AchievementCreate(AchievementBase):
    pass


class AchievementUpdate(BaseModel):
    title: str | None = None
    description: str | None = None

    date: Date | None = None

    icon: str | None = None
    link: str | None = None

    display_order: int | None = None


class AchievementResponse(AchievementBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )