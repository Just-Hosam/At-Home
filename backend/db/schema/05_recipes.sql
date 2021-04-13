DROP TABLE IF EXISTS recipes CASCADE;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  dashboard_id INTEGER REFERENCES dashboards(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  directions TEXT NOT NULL,
  time VARCHAR(255),
  img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
);
