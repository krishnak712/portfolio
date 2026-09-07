from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectSectionBase(BaseModel):
    project_id: int

    section_type: str
    eyebrow: str | None = None
    title: str
    subtitle: str | None = None
    description: str | None = None

    layout_type: str = "default"
    display_order: int = 0


class ProjectSectionCreate(ProjectSectionBase):
    pass


class ProjectSectionUpdate(BaseModel):
    section_type: str | None = None
    eyebrow: str | None = None
    title: str | None = None
    subtitle: str | None = None
    description: str | None = None

    layout_type: str | None = None
    display_order: int | None = None


class ProjectSectionResponse(ProjectSectionBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )