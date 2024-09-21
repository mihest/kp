from typing import AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from src.config import settings


class DatabaseHelper:
    def __init__(self, url: str, echo: bool = False):
        self.engine = create_async_engine(
            url=url,
            echo=echo
        )
        self.session = async_sessionmaker(
            autocommit=False,
            autoflush=False,
            expire_on_commit=False,
            bind=self.engine
        )

    async def get_async_session(self) -> AsyncGenerator[AsyncSession, None]:
        async with self.session() as session:
            yield session


db = DatabaseHelper(
    url=settings.db_url,
    echo=settings.db_echo
)
