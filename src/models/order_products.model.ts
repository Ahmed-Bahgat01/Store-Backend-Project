import dbClient from '../database'
import OrderProduct from '../types/order_product.type'

class OrderProductModel {
  // create order
  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await dbClient.connect()
      const sql = `INSERT INTO order_products(quantity, order_id, product_id) 
      values ($1, $2, $3) 
      RETURNING *`
      const result = await conn.query(sql, [
        orderProduct.quantity,
        orderProduct.orderId,
        orderProduct.productId,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create order product. Error: ${error}`)
    }
  }

  // get all order products table raws
  async index(): Promise<OrderProduct[]> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT * FROM order_products`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot index orders-products. Error: ${error}`)
    }
  }

  // show
  async show(id: string): Promise<OrderProduct> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT * FROM order_products WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get order-product. Error: ${error}`)
    }
  }

  // update
  async update(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await dbClient.connect()
      const sql = `UPDATE order_products 
      SET quantity=$1, order_id=$2, product_id=$3
      WHERE id=$4
      RETURNING *`
      const result = await conn.query(sql, [
        orderProduct.quantity,
        orderProduct.orderId,
        orderProduct.productId,
        orderProduct.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot update order-product. Error: ${error}`)
    }
  }
  // delete
  async delete(id: string): Promise<OrderProduct> {
    try {
      const conn = await dbClient.connect()
      const sql = `DELETE FROM order_products 
      WHERE id=$1
      RETURNING *`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot delete order-product. Error: ${error}`)
    }
  }
}
export default OrderProductModel

// SELECT name, price, quantity, order_id, product_id
//  FROM products INNER JOIN order_products
//  ON products.id=order_products.product_id;
