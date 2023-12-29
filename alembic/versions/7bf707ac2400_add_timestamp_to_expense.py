"""add timestamp to expense

Revision ID: 7bf707ac2400
Revises: b5826899c8c6
Create Date: 2023-12-22 17:18:20.608318

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "7bf707ac2400"
down_revision: Union[str, None] = "b5826899c8c6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "expense_timestamped",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("amount", sa.Integer, nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("timestamp", sa.String(), nullable=False),
        sa.Column(
            "fk_expenses_id_spenders",
            sa.Integer,
            sa.ForeignKey("spender.id"),
            nullable=False,
        ),
    )
    op.execute(
        "INSERT INTO expense_timestamped (amount, description, fk_expenses_id_spenders) SELECT amount, description, fk_expenses_id_spenders from expenses"
    )
    op.drop_table("expenses")
    op.rename_table("expense_timestamped", "expenses")


def downgrade() -> None:
    op.create_table(
        "old_expenses",
        sa.Column("id", sa.Integer),
        sa.Column("amount", sa.Integer),
        sa.Column("description", sa.String()),
        sa.Column("fk_expenses_id_spenders", sa.Integer, sa.ForeignKey("spender.id")),
    )
    op.execute(
        "INSERT INTO old_expenses (amount, description, spender_id) SELECT (amount, description, spender_id) from expenses"
    )
    op.drop_table("expenses")
    op.rename_table("old_expenses", "expenses")
