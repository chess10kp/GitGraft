"""create expense table

Revision ID: 2cc2d169f968
Revises: 26af1807fba7
Create Date: 2023-12-19 17:39:11.379826

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "2cc2d169f968"
down_revision: Union[str, None] = "26af1807fba7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "expenses",
        sa.Column("id", sa.Integer),
        sa.Column("amount", sa.Integer),
        sa.Column("description", sa.String()),
    )


def downgrade() -> None:
    op.drop_table("expenses")
