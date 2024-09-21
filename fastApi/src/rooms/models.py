import uuid
from typing import List

from sqlalchemy import UUID, CheckConstraint, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..BaseModelORM import Base


class RoomType(Base):
    __tablename__ = 'room_type'
    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, index=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(nullable=False, unique=True)


class Room(Base):
    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, index=True, default=uuid.uuid4)

    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=True)
    price: Mapped[int] = mapped_column(nullable=False)
    square: Mapped[int] = mapped_column(nullable=False)
    sleeping_places: Mapped[int] = mapped_column(nullable=False)
    conditioner: Mapped[bool] = mapped_column(default=False, nullable=False)
    wi_fi: Mapped[bool] = mapped_column(default=False, nullable=False)
    amenities: Mapped[dict[str, any]] = mapped_column(JSON, nullable=True)
    room_type_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('room_type.id'), nullable=True)
    room_number: Mapped[int] = mapped_column(nullable=False)
    floor_number: Mapped[int] = mapped_column(nullable=False)

    bookings: Mapped[List["Booking"]] = relationship("Booking", back_populates="room")

    __table_args__ = (
        CheckConstraint('price >= 0', name='check_price_positive'),
        CheckConstraint('square >= 0', name='check_square_positive'),
        CheckConstraint('sleeping_places >= 0', name='check_sleeping_places_positive'),
    )

