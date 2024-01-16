"""create tables

Revision ID: 26af1807fba7
Revises: 
Create Date: 2023-12-19 08:47:52.571433

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "26af1807fba7"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'spender',
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False)
    )


def downgrade() -> None:
    op.drop_table('spender')
