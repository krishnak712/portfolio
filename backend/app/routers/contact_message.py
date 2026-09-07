from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import (
    ContactMessageCreate,
    ContactMessageResponse,
)


router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


@router.post(
    "",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED
)
def create_contact_message(
    message_data: ContactMessageCreate,
    db: Session = Depends(get_db)
):

    contact_message = ContactMessage(
        **message_data.model_dump()
    )

    db.add(contact_message)
    db.commit()
    db.refresh(contact_message)

    return contact_message


@router.get(
    "",
    response_model=list[ContactMessageResponse]
)
def get_contact_messages(
    db: Session = Depends(get_db)
):

    return (
        db.query(ContactMessage)
        .order_by(
            ContactMessage.created_at.desc()
        )
        .all()
    )


@router.put(
    "/{message_id}/read",
    response_model=ContactMessageResponse
)
def mark_message_as_read(
    message_id: int,
    db: Session = Depends(get_db)
):

    message = (
        db.query(ContactMessage)
        .filter(
            ContactMessage.id == message_id
        )
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )

    message.is_read = True

    db.commit()
    db.refresh(message)

    return message


@router.delete(
    "/{message_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_contact_message(
    message_id: int,
    db: Session = Depends(get_db)
):

    message = (
        db.query(ContactMessage)
        .filter(
            ContactMessage.id == message_id
        )
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )

    db.delete(message)
    db.commit()

    return None