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
    op.create_table("expenses_neo", 
        sa.Column("id", sa.Integer),
        sa.Column("amount", sa.Integer),
        sa.Column("description", sa.String()),
        sa.Column("user_id", sa.Integer, sa.ForeignKey('spender.id')))
    op.execute('INSERT INTO expenses_neo (amount , description) SELECT amount, description FROM expenses')
    op.drop_table("expenses")
    op.rename_table("expenses_neo", "expenses")


def downgrade() -> None:
    op.create_table("expenses_retro")
    op.execute('INSERT INTO expenses_retro (amount, description) SELECT amount,description FROM expenses')
    op.drop_table("expenses")
    op.rename_table("expenses_retro", "expenses")
