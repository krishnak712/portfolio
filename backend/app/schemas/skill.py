from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SkillBase(BaseModel):
    name: str
    category: str

    description: str | None = None
    proficiency: int | None = None

    display_order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: str | None = None
    category: str | None = None

    description: str | None = None
    proficiency: int | None = None

    display_order: int | None = None


class SkillResponse(SkillBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)