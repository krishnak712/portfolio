from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectTechnologyBase(BaseModel):
    project_id: int
    technology: str
    display_order: int = 0


class ProjectTechnologyCreate(ProjectTechnologyBase):
    pass


class ProjectTechnologyUpdate(BaseModel):
    technology: str | None = None
    display_order: int | None = None


class ProjectTechnologyResponse(ProjectTechnologyBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )