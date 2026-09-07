from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field
from pydantic import BaseModel, ConfigDict


class VisitorCreate(BaseModel):
    visitor_id: UUID | None = None

    ip_hash: str | None = None

    country: str | None = None
    city: str | None = None

    device_type: str | None = None
    browser: str | None = None
    operating_system: str | None = None

    referrer: str | None = None


class VisitorUpdate(BaseModel):
    ip_hash: str | None = None

    country: str | None = None
    city: str | None = None

    device_type: str | None = None
    browser: str | None = None
    operating_system: str | None = None

    referrer: str | None = None


class VisitorResponse(BaseModel):
    id: int
    visitor_id: UUID

    first_visit_at: datetime
    last_visit_at: datetime

    visit_count: int

    country: str | None
    city: str | None

    device_type: str | None
    browser: str | None
    operating_system: str | None

    referrer: str | None

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

class VisitorLocationUpdate(BaseModel):
    visitor_id: UUID
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)