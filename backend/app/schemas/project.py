from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict


class ProjectTechnologyResponse(BaseModel):
    id: int
    technology: str
    display_order: int = 0

    model_config = ConfigDict(
        from_attributes=True
    )


class ProjectDetailResponse(BaseModel):
    id: int
    project_id: int

    overview: str | None = None
    problem_statement: str | None = None
    solution: str | None = None
    my_role: str | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


class ProjectSectionItemResponse(BaseModel):
    id: int
    section_id: int

    item_number: str | None = None
    label: str | None = None
    title: str
    description: str | None = None
    badge: str | None = None
    display_order: int = 0

    model_config = ConfigDict(
        from_attributes=True
    )


class ProjectSectionResponse(BaseModel):
    id: int
    project_id: int

    section_type: str
    eyebrow: str | None = None
    title: str
    subtitle: str | None = None
    description: str | None = None
    layout_type: str = "default"
    display_order: int = 0

    items: list[ProjectSectionItemResponse] = []

    model_config = ConfigDict(
        from_attributes=True
    )


class ProjectBase(BaseModel):
    title: str
    slug: str

    project_type: str | None = None
    project_mode: Literal["Personal", "Professional"]
    short_description: str | None = None
    description: str | None = None

    role: str | None = None

    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None

    featured: bool = False
    status: str = "In Progress"

    display_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None

    project_type: str | None = None
    short_description: str | None = None
    description: str | None = None

    role: str | None = None

    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None

    featured: bool | None = None
    status: str | None = None

    display_order: int | None = None


class ProjectResponse(ProjectBase):
    id: int

    created_at: datetime
    updated_at: datetime

    technologies: list[ProjectTechnologyResponse] = []
    detail: ProjectDetailResponse | None = None
    sections: list[ProjectSectionResponse] = []

    model_config = ConfigDict(
        from_attributes=True
    )