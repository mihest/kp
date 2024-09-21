import uuid

from fastapi import HTTPException, status
from sqlalchemy import select, and_, or_
from .models import Room

from .dao import RoomDAO
from .models import Room as RoomModel
from .schemas import RoomCreateDB, RoomCreate, RoomPut, RoomPatch, RoomUpdateDB
from ..booking.models import Booking
from ..db_helper import db
from datetime import date, timedelta
from sqlalchemy.orm import joinedload

async_session_maker = db.session


class RoomService:
    @classmethod
    async def get_room(cls, room_id: uuid.UUID):
        async with async_session_maker() as session:
            db_room = await RoomDAO.find_one_or_none(session, id=room_id)

            if db_room is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Room not found"
                )

            bookings = await RoomDAO.get_rooms_and_bookings(session, room_id)
            # booked_array = []  # Используем set, чтобы избежать дублирования
            # booked_dates = []
            # for booking in bookings:
            #     start_date = booking.date_from
            #     end_date = booking.date_to
            #
            #     current_date = start_date if start_date >= date.today() else date.today()
            #     while current_date < end_date:
            #         booked_dates.append(current_date)
            #         current_date += timedelta(days=1)
            #     booked_array.append(list(booked_dates))
            #     booked_dates.clear()

            return {'room': db_room, 'bookings': bookings}

    @classmethod
    async def create_room(cls, room: RoomCreate) -> RoomModel:
        async with async_session_maker() as session:
            db_room = await RoomDAO.add(
                session,
                RoomCreateDB(
                    **room.model_dump()
                )
            )
            await session.commit()

        return db_room

    @classmethod
    async def get_rooms_list(cls, *filter, offset: int = 0, limit: int = 10, **filter_by) -> list[RoomModel]:
        async with async_session_maker() as session:
            rooms = await RoomDAO.find_all(session, *filter, offset=offset, limit=limit, **filter_by)
        if rooms is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Rooms not found"
            )
        return rooms

    @classmethod
    async def update_room(cls, room_id: uuid.UUID, room: RoomPatch | RoomPut) -> RoomModel:
        async with async_session_maker() as session:
            db_room = await RoomDAO.find_one_or_none(session, id=room_id)
            if db_room is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Room not found"
                )

            room_update = await RoomDAO.update(
                session,
                RoomModel.id == room_id,
                obj_in=RoomUpdateDB(**room.model_dump(exclude_unset=True))
            )
            await session.commit()
            return room_update
