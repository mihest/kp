from sqlalchemy import MetaData
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr

from src.constants import DB_NAMING_CONVENTION

metadata = MetaData(naming_convention=DB_NAMING_CONVENTION)


class Base(DeclarativeBase):
    __abstract__ = True
    metadata = metadata

    id: Mapped[int] = mapped_column(primary_key=True)

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"{cls.__name__.lower()}"


