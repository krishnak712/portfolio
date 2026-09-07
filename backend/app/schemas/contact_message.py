from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field
)


class ContactMessageCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=150
    )

    email: EmailStr

    subject: str = Field(
        min_length=1,
        max_length=255
    )

    message: str = Field(
        min_length=10,
        max_length=2000
    )


class ContactMessageResponse(BaseModel):
    id: int

    name: str
    email: EmailStr
    subject: str | None
    message: str

    is_read: bool

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )