CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);