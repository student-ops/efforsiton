CREATE DATABASE mydatabase;
\c mydatabase

-- ここがSHCEMAになってた

CREATE ROLE recuruit WITH LOGIN PASSWORD 'recuruit';
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO recuruit;