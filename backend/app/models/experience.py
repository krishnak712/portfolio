from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime
)
from sqlalchemy.sql import func

from app.database import Base


class Experience(Base):
    __tablename__ = "experience"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    company = Column(
        String(255),
        nullable=False
    )

    position = Column(
        String(255),
        nullable=False
    )

    location = Column(
        String(255),
        nullable=True
    )

    start_date = Column(
        Date,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    display_order = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )