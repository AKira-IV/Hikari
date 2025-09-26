-- Initialization script for Hikari database
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant permissions to the user
GRANT ALL PRIVILEGES ON DATABASE hikari TO hikari_user;
