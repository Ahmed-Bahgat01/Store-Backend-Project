# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## **API Endpoints Brief**

 >.<><><><><><><><><><><><><><><><><><><><><><><><><><><>.
 >.
 >==*Note:*== you can use ==**postman collection**== provided that has all endpoints.
 >.
 >.<><><><><><><><><><><><><><><><><><><><><><><><><><><>.




### Users

|Name   |Endpoint      |Verb |Token|Body|
|-------|--------------|------|---|---|
|create |/api/users    |post  |✅ |✅ |
|index  |/api/users    |get   |✅ |❌ |
|show   |/api/users/:id|get   |✅ |❌ |
|update |/api/users/:id|patch |✅ |✅ |
|delete |/api/users/:id|delete|✅ |❌ |
|authenticate|/api/users/authenticate|post |❌ |✅ |
|get user orders|/api/users/:id/orders|get |✅ |❌ |

### Products
|Name   |Endpoint         |Verb   |Token|Body|
|-------|-----------------|-------|---|---|
|create |/api/products    |post   |✅ |✅ |
|index  |/api/products    |get    |❌ |❌ |
|show   |/api/products/:id|get    |❌ |❌ |
|update |/api/products/:id|patch  |✅ |✅ |
|delete |/api/products/:id|delete |✅ |❌ |

### Orders
|Name   |Endpoint      |Verb |Token|Body|
|-------|--------------|------|---|---|
|create |/api/orders    |post  |✅ |✅ |
|index  |/api/orders    |get   |✅ |❌ |
|show   |/api/orders/:id|get   |✅ |❌ |
|update |/api/orders/:id|patch |✅ |✅ |
|delete |/api/orders/:id|delete|✅ |❌ |
|add product to order| /api/orders/:id/products| post |✅ |✅ |
|delete product from order |/api/orders/:id/products/:pid |delete|✅ |❌ |
|get order products |/api/orders/:id/products |get |❌ |❌ |


## **API Endpoints Detailed**
### **Users**
- **Create**
  - Endpoint: ```/api/users```
  - Verb: ```post```
  - Body: 
    ```json
      {
        "email": "example@some.com",
        "user_name": "egyption king",
        "first_name": "mo",
        "last_name": "salah",
        "password": "strongpass"
      }
    ```
- **Index ```token required```**
  - Endpoint: ```/api/users```
  - Verb: ```get```
  - Body: ```N/A```
- **Show ```token required```**
  - Endpoint: ```/api/users/:id```
  - Verb: ```get```
  - Body: ```N/A```
- **Update ```token required```**
  - Endpoint: ```/api/users/:id```
  - Verb: ```patch```
  - Body: 
    ```json
      {
        "email": "example@some.com",
        "user_name": "egyption king",
        "first_name": "mo",
        "last_name": "salah",
        "password": "strongpass"
      }
      ```
- **Delete ```token required```**
  - Endpoint: ```/api/users/:id```
  - Verb: ```delete```
  - Body: ```N/A```
- **Authenticate**
  - Endpoint: ```/api/users/authenticate```
  - Verb: ```patch```
  - Body: 
    ```json
      {
        "email": "example@some.com",
        "password": "examplepass"
      }
    ```
- **Get user orders ```token required```**
  - Endpoint: ```/api/users/:id/orders```
  - Verb: ```get```
  - Body: ```N/A```


### Products
- **Create** ```token required```
  - Endpoint: ```/api/products```
  - Verb: ```post```
  - Body: 
    ```json
      {
        "name": "new iphone",
        "price": "9999999"
      }
    ```
- **Index**
  - Endpoint: ```/api/products```
  - Verb: ```get```
  - Body: ```N/A```
- **Show**
  - Endpoint: ```/api/products/:id```
  - Verb: ```get```
  - Body: ```N/A```
- **Update ```token required```**
  - Endpoint: ```/api/products/:id```
  - Verb: ```patch```
  - Body: 
    ```json
      {
        "name": "updated2Product",
        "price": "456"
      }
      ```
- **Delete ```token required```**
  - Endpoint: ```/api/products/:id```
  - Verb: ```delete```
  - Body: ```N/A```

- *[OPTIONAL] Top 5 most popular products* 
- *[OPTIONAL] Products by category (args: product category)*

### Orders
- **Create** ```token required```
  - Endpoint: ```/api/orders```
  - Verb: ```post```
  - Body: 
    ```json
      {
        "status": "active",
        "user_id": "88e57fe9-b4d8-4152-977c-d4be07e20eb5"
      }
    ```
- **Index**
  - Endpoint: ```/api/orders```
  - Verb: ```get```
  - Body: ```N/A```
- **Show**
  - Endpoint: ```/api/orders/:id```
  - Verb: ```get```
  - Body: ```N/A```
- **Update ```token required```**
  - Endpoint: ```/api/orders/:id```
  - Verb: ```patch```
  - Body: 
    ```json
      {
        "status": "completed",
        "user_id": "88e57fe9-b4d8-4152-977c-d4be07e20eb5"
      }
    ```
- **Delete ```token required```**
  - Endpoint: ```/api/orders/:id```
  - Verb: ```delete```
  - Body: ```N/A```


- **Add product to order ```token required```**
  - Endpoint: ```/api/orders/:id/products```
  - Verb: ```post```
  - Body: 
    ```json
      {
        "quantity": "2",
        "product_id": "2e58ddf6-dbd5-4ef0-9ced-7a5fd7ecd2fa"
      }
    ```
- **Delete product from order ```token required```**
  - Endpoint: ```/api/orders/:id/products/:pid```
  - Verb: ```delete```
  - Body: ```N/A```


- **Get products in order** 
  - Endpoint: ```/api/orders/:id/products```
  - Verb: ```get```
  - Body: ```N/A```


- *[OPTIONAL] Completed Orders by user (args: user id)[token required]*


## Data Schema
#### Users
```sql
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  user_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(250) NOT NULL
);
```

#### Products
```sql
CREATE TABLE products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  price INTEGER NOT NULL
);
```
#### Orders
```sql
CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  status VARCHAR(64),
  user_id uuid DEFAULT uuid_generate_v4() REFERENCES users(id)
);
```
#### Order Products Join Table
```sql
CREATE TABLE order_products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity INTEGER,
  order_id uuid DEFAULT uuid_generate_v4() references orders(id),
  product_id uuid DEFAULT uuid_generate_v4() references products(id)
);
```
## Data Shapes


#### User
```typescript
type User = {
  id?: string,
  email: string,
  user_name: string,
  first_name: string,
  last_name: string,
  password: string
}
```

#### Product
```typescript
type Product = {
  id?: string,
  name: string,
  price: number
}
```

#### Orders
```typescript
type Order = {
  id?: string,
  status: string,
  user_id: string
}
```
#### Order Product
```typescript
type OrderProduct = {
  id?: string;
  quantity: number;
  order_id?: string;
  product_id: string;
};
```

