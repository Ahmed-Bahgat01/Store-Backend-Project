CREATE TABLE order_products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity INTEGER,
  order_id uuid DEFAULT uuid_generate_v4() references orders(id),
  product_id uuid DEFAULT uuid_generate_v4() references products(id)
);