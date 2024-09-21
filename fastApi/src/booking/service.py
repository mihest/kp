import uuid

from fastapi import HTTPException, status
from sqlalchemy import and_, or_

from src.booking.dao import BookingDAO
from src.booking.models import Booking
from src.booking.schemas import CreateBooking
from src.db_helper import db

async_session_maker = db.session


class BookingService:
    @classmethod
    async def get_booking(cls, booking_id: uuid.UUID) -> Booking:
        async with async_session_maker() as session:
            db_booking = BookingDAO.find_one_or_none(session, booking_id)
        if db_booking is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found"
            )
        return db_booking

    @classmethod
    async def get_bookings_list(cls, *filter: any, offset: int = 0, limit: int = 10, **filter_by) -> list[Booking]:
        async with async_session_maker() as session:
            db_bookings = await BookingDAO.find_all(session, *filter, offset=offset, limit=limit, **filter_by)
        if db_bookings is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Bookings not found"
            )
        return db_bookings

    @classmethod
    async def create_booking(cls, booking: CreateBooking) -> Booking:
        async with async_session_maker() as session:
            if await BookingDAO.find_one_or_none(session,
                                                 or_(
                                                     and_(Booking.date_from < booking.date_from,
                                                          Booking.date_to > booking.date_from),
                                                     and_(Booking.date_from < booking.date_to,
                                                          Booking.date_to > booking.date_to),
                                                     and_(Booking.date_from >= booking.date_from,
                                                          Booking.date_to <= booking.date_to)
                                                 )):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT, detail="Booking overlaps with existing booking"
                )
            db_booking = await BookingDAO.add(session, booking)
            await session.commit()
        return db_booking
