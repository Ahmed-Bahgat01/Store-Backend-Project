import dbClient from '../database'
import Order from '../types/order.type'
import OrderProduct from '../types/order_product.type'

class OrderModel {
  // create order
  async create(order: Order): Promise<Order> {
    try {
      const conn = await dbClient.connect()
      const sql = `INSERT INTO orders(status, user_id) 
      values ($1, $2) 
      RETURNING *`
      const result = await conn.query(sql, [
        order.status,
        order.user_id,
        // order.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create order. Error: ${error}`)
    }
  }

  // get all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT status, user_id FROM orders`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot index orders. Error: ${error}`)
    }
  }

  // show
  async show(id: string): Promise<Order> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT * FROM orders WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get order. Error: ${error}`)
    }
  }

  // update
  async update(order: Order): Promise<Order> {
    try {
      const conn = await dbClient.connect()
      const sql = `UPDATE orders 
      SET status=$1, user_id=$2
      WHERE id=$3
      RETURNING *`
      const result = await conn.query(sql, [
        order.status,
        order.user_id,
        order.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot update order. Error: ${error}`)
    }
  }
  // delete
  async delete(id: string): Promise<Order> {
    try {
      const conn = await dbClient.connect()
      const sql = `DELETE FROM orders 
      WHERE id=$1
      RETURNING *`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot delete order. Error: ${error}`)
    }
  }
  // add product to order in join table
  async addProduct(
      quantity: number,
      orderId: string,
      productId: string,
  ): Promise<OrderProduct> {
    try {
      const conn = await dbClient.connect()
      const sql = `INSERT INTO order_products 
      (quantity, order_id, product_id) 
      values ($1, $2, $3)
      Returning *`
      const result = await conn.query(sql, [quantity, orderId, productId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot add products to order. Error: ${error}`)
    }
  }

  async deleteProduct(
      orderId: string,
      productId: string,
  ): Promise<OrderProduct> {
    try {
      const conn = await dbClient.connect()
      const sql = `DELETE FROM order_products 
      WHERE order_id=$1 AND product_id=$2 
      Returning *`
      const result = await conn.query(sql, [orderId, productId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot delete product from order. Error: ${error}`)
    }
  }

  async getOrderProducts(
      orderId: string,
  ): Promise<OrderProduct[]> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT name, price, quantity, product_id
      FROM  products INNER JOIN order_products
      ON products.id=order_products.product_id
      WHERE order_products.order_id=$1`
      const result = await conn.query(sql, [orderId])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get order products. Error: ${error}`)
    }
  }

  // TODO: add editProductQuantity() method
  // TODO: edit order status to be (completed , active)
}
export default OrderModel
