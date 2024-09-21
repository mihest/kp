from typing import Optional

from sqlalchemy.orm import joinedload

from .models import UserModel, RefreshSessionModel, Role
from .schemas import UserCreateDB, UserUpdateDB, RefreshSessionCreate, RefreshSessionUpdate
from ..dao import BaseDAO, ModelType
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


class UserDAO(BaseDAO[UserModel, UserCreateDB, UserUpdateDB]):
    model = UserModel

    @classmethod
    async def find_one_or_none(cls, session: AsyncSession, *filter, **filter_by) -> Optional[UserModel]:
        stmt = select(cls.model).options(joinedload(cls.model.role)).filter(*filter).filter_by(**filter_by)
        result = await session.execute(stmt)
        return result.scalars().one_or_none()


class RefreshSessionDAO(BaseDAO[RefreshSessionModel, RefreshSessionCreate, RefreshSessionUpdate]):
    model = RefreshSessionModel
