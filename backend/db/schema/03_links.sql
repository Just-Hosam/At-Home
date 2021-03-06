DROP TABLE IF EXISTS links CASCADE;

CREATE TABLE links (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dashboard_id INTEGER REFERENCES dashboards(id) ON DELETE CASCADE,
  admin BOOLEAN NOT NULL
);
