from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectSectionItemBase(BaseModel):
    section_id: int

    item_number: str | None = None
    label: str | None = None
    title: str
    description: str | None = None
    badge: str | None = None

    display_order: int = 0


class ProjectSectionItemCreate(ProjectSectionItemBase):
    pass


class ProjectSectionItemUpdate(BaseModel):
    item_number: str | None = None
    label: str | None = None
    title: str | None = None
    description: str | None = None
    badge: str | None = None

    display_order: int | None = None


class ProjectSectionItemResponse(ProjectSectionItemBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )