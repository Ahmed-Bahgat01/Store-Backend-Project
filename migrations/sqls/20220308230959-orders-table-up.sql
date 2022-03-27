CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  status VARCHAR(64),
  user_id uuid DEFAULT uuid_generate_v4() REFERENCES users(id)
);