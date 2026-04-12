"""
Database connection setup.

This file creates the "engine" (the connection to PostgreSQL)
and a "session" (a conversation with the database).

Every time your API needs to read/write data, it opens a session,
does its work, and closes the session.
"""

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

# The engine is the connection to PostgreSQL.
# We'll pass the actual database URL later via config.
# For now, this is a helper function that creates everything we need.


def setup_database(database_url: str):
    """
    Call this once when the app starts.
    Returns an engine and a session factory.

    - engine: the connection to the database
    - session_factory: creates new sessions (like opening a fresh spreadsheet tab)
    """
    engine = create_async_engine(database_url, echo=True)
    # echo=True means it prints SQL queries to the console — helpful for learning!

    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    return engine, session_factory
