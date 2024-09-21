import json
import uuid
from typing import Any, Dict, List

from fastapi import APIRouter, HTTPException, status, Depends, Query
from pydantic import BaseModel
from sqlalchemy import text, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.dependencies import get_current_superuser
from src.auth.models import UserModel
from src.db_helper import db
# from src.rooms.schemas import Room, RoomPatch, RoomCreateOrPut
from src.rooms.models import Room as RoomModel
from src.rooms.schemas import RoomCreate, RoomPut, RoomBase, RoomPatch
from src.rooms.service import RoomService

router = APIRouter()


class RoomAd(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    price: int
    square: int
    sleeping_places: int
    conditioner: bool
    wi_fi: bool
    amenities: List[str] | Dict[str, Any]
    room_number: int
    floor_number: int
    room_type_id: uuid.UUID
    bookings: List[Dict] | None = None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


@router.get("/{room_id}")
async def read_room(room_id: uuid.UUID):
    return await RoomService.get_room(room_id)


@router.get("")
async def read_rooms(
        limit: int = Query(default=30, le=100),
        page: int = Query(default=1, ge=1)
):
    offset = (page - 1) * limit
    rooms = await RoomService.get_rooms_list(offset=offset, limit=limit)
    return {
        "rooms": rooms,
        "limit": limit,
        "page": page
    }


@router.post("")
async def create_room(
    room: RoomCreate,
    user: UserModel = Depends(get_current_superuser)
):
    return await RoomService.create_room(room)


@router.put("/{room_id}")
async def put_update_room(
    room_id: uuid.UUID,
    room: RoomPut,
    user: UserModel = Depends(get_current_superuser)
):
    return await RoomService.update_room(room_id, room)


@router.patch("/{room_id}")
async def patch_update_room(
    room_id: uuid.UUID,
    room: RoomPatch = None,
    user: UserModel = Depends(get_current_superuser)
):
    return await RoomService.update_room(room_id=room_id, room=room)

