from datetime import date

from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Room as RoomModel
from .schemas import RoomCreateDB, RoomUpdateDB
from ..booking.models import Booking
from ..dao import BaseDAO


class RoomDAO(BaseDAO[RoomModel, RoomCreateDB, RoomUpdateDB]):
    model = RoomModel

    @classmethod
    async def get_rooms_and_bookings(cls, session: AsyncSession, room_id):
        today = date.today()
        bookings_query = (
            select(Booking.date_from, Booking.date_to)
            .where(
                and_(
                    Booking.room_id == room_id,
                    or_(
                        Booking.date_from >= today,
                        Booking.date_to >= today
                    )
                )
            )
        )
        result = await session.execute(bookings_query)

        return result.mappings().all()

