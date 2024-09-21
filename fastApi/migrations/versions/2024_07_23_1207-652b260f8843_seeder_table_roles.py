"""Seeder table roles

Revision ID: 652b260f8843
Revises: 0c0582f0c729
Create Date: 2024-07-22 20:27:23.186021

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.orm import Session

# revision identifiers, used by Alembic.
revision: str = '652b260f8843'
# Айди ревизии создания таблиц users and roles
down_revision: Union[str, None] = '84351f26a42e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    session = Session(bind=bind)

    session.execute(
        sa.text("""
                INSERT INTO role (name) VALUES
                ('user'),
                ('admin')
            """)
    )

    session.commit()
    op.alter_column('user', 'role_id', server_default='1')


def downgrade() -> None:
    op.alter_column('user', 'role_id', server_default=None)
    bind = op.get_bind()
    session = Session(bind=bind)

    session.execute(
        sa.text("""
                DELETE FROM role WHERE id IN (1, 2)
            """)
    )

    session.commit()
