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


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    date = Column(
        Date,
        nullable=True
    )

    icon = Column(
        String(100),
        nullable=True
    )

    link = Column(
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