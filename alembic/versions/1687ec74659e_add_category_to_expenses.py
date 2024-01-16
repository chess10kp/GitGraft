"""add category to expenses

Revision ID: 1687ec74659e
Revises: 7bf707ac2400
Create Date: 2024-01-12 21:10:24.733642

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "1687ec74659e"
down_revision: Union[str, None] = "7bf707ac2400"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "expenses_with_category",
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
        sa.Column(
            "category",
            sa.String,
            nullable=False,
        ),
    )
    op.execute(
        "INSERT INTO expenses_with_category (amount , description) SELECT amount, description FROM expenses"
    )
    op.drop_table("expenses")
    op.rename_table("expenses_with_category", "expenses")


def downgrade() -> None:
    op.create_table("expenses_retro")
    op.execute(
        "INSERT INTO expenses_retro (amount, description, timestamp) SELECT amount,description,timestamp FROM expenses"
    )
    op.drop_table("expenses")
    op.rename_table("expenses_retro", "expenses")
