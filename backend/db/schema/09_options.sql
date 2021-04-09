DROP TABLE IF EXISTS options CASCADE;

CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  choice VARCHAR(255) NOT NULL,
  votes INTEGER
);
