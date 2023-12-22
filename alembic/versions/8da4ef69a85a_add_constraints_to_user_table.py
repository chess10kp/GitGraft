"""add constraints to user table

Revision ID: 8da4ef69a85a
Revises: 2cc2d169f968
Create Date: 2023-12-19 19:54:21.424328

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8da4ef69a85a'
down_revision: Union[str, None] = '2cc2d169f968'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
