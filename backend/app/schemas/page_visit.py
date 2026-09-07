from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class PageVisitCreate(BaseModel):
    visitor_id: int

    page_path: str
    page_title: str | None = None

    session_id: UUID | None = None

    duration_seconds: int | None = None


class PageVisitUpdate(BaseModel):
    duration_seconds: int | None = None


class PageVisitResponse(BaseModel):
    id: int

    visitor_id: int

    page_path: str
    page_title: str | None

    visited_at: datetime

    session_id: UUID | None

    duration_seconds: int | None

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )