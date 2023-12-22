"""add foreign key to users

Revision ID: b5826899c8c6
Revises: 8da4ef69a85a
Create Date: 2023-12-20 19:41:30.426190

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "b5826899c8c6"
down_revision: Union[str, None] = "8da4ef69a85a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "expenses_neo",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("amount", sa.Integer, nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column(
            "fk_expenses_id_spenders",
            sa.Integer,
            sa.ForeignKey("spender.id"),
            nullable=False,
        ),
    )
    op.execute(
        "INSERT INTO expenses_neo (amount , description) SELECT amount, description FROM expenses"
    )
    op.drop_table("expenses")
    op.rename_table("expenses_neo", "expenses")


def downgrade() -> None:
    op.create_table("expenses_retro")
    op.execute(
        "INSERT INTO expenses_retro (amount, description) SELECT amount,description FROM expenses"
    )
    op.drop_table("expenses")
    op.rename_table("expenses_retro", "expenses")
