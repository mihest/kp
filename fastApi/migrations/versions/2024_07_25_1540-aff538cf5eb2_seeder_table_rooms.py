"""seeder table rooms

Revision ID: aff538cf5eb2
Revises: ae87db06f959
Create Date: 2024-07-25 15:40:59.002751

"""
import uuid
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.orm import Session

# revision identifiers, used by Alembic.
revision: str = 'aff538cf5eb2'
down_revision: Union[str, None] = '652b260f8843'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def get_new_id():
    return uuid.uuid4()


def upgrade() -> None:
    bind = op.get_bind()
    session = Session(bind=bind)

    session.execute(
        sa.text(f"""
                    INSERT INTO room_type (id, name) VALUES
                    ('{get_new_id()}', 'Люкс'),
                    ('{get_new_id()}', 'Стандарт'),
                    ('{get_new_id()}', 'Семейный'),
                    ('{get_new_id()}', 'Призедентский')
                """)
    )
    price = 12000
    amenities = [
        "Кондиционер",
        "Двуспальная кровать",
        "Массажное кресло"
    ]
    for i in range(20):

        session.execute(
            sa.text(f"""
                INSERT INTO room (
                    id,
                    title,
                    description,
                    price,
                    square,
                    sleeping_places,
                    conditioner,
                    wi_fi,
                    amenities,
                    room_type_id,
                    room_number,
                    floor_number
                ) VALUES (
                    '{get_new_id()}',
                    'Люкс 3-комнатная',
                    'Погрузитесь в уют и комфорт в нашем просторном двухместном номере с потрясающим видом на окружающие горы. Здесь вы найдете идеальное пристанище для уединенного отдыха в окружении величественной природы. Этот номер создан для пары, желающей проникнуться романтикой и уединением, а также для индивидуального путешественника, который ценит спокойствие и гармонию с собой и миром.',
                    {price},
                    16,
                    3,
                    true,
                    true,
                    '["Кондиционер", "Двуспальная кровать", "Массажное кресло"]'::jsonb,
                    (SELECT id FROM room_type LIMIT 1),
                    111,
                    1
                )
            """)
        )
        price += 1499

    session.commit()


def downgrade() -> None:
    op.alter_column('user', 'role_id', server_default=None)
    bind = op.get_bind()
    session = Session(bind=bind)

    session.execute(
        sa.text("""
                    DELETE FROM room_type WHERE id IN (SELECT id FROM room_type)
                """)
    )

    session.commit()
