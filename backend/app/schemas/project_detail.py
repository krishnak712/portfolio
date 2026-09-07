from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectDetailBase(BaseModel):
    project_id: int

    overview: str | None = None
    problem_statement: str | None = None
    solution: str | None = None
    my_role: str | None = None


class ProjectDetailCreate(ProjectDetailBase):
    pass


class ProjectDetailUpdate(BaseModel):
    overview: str | None = None
    problem_statement: str | None = None
    solution: str | None = None
    my_role: str | None = None


class ProjectDetailResponse(ProjectDetailBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )