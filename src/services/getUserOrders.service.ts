// TODO: delete this file if not needed

// import dbClient from '../database'
// import Order from '../types/order.type'
// import OrderProduct from '../types/order_product.type'

// export class DashboardQueries {
//   async getUserOrders(userId: string): Promise<Order[]> {
//     try {
//       const conn = await dbClient.connect()
//       const sql = `SELECT id, status FROM orders WHERE user_id=$1`
//       const result = await conn.query(sql, [userId])
//       conn.release()
//       return result.rows
//     } catch (error) {
//       throw new Error(`Cannot get user orders. Error: ${error}`)
//     }
//   }

//   async addProductToOrder(
//       quantity: number,
//       orderId: string,
//       productId: string,
//   ): Promise<OrderProduct> {
//     try {
//       const conn = await dbClient.connect()
//       const sql = `INSERT INTO order_products
//     (quantity, order_id, product_id)
//     values ($1, $2, $3)
//     Returning *`
//       const result = await conn.query(sql, [quantity, orderId, productId])
//       conn.release()
//       return result.rows[0]
//     } catch (error) {
//       throw new Error(`Cannot add products to order. Error: ${error}`)
//     }
//   }

//   async deleteProductFromOrder(
//       orderId: string,
//       productId: string,
//   ): Promise<OrderProduct> {
//     try {
//       const conn = await dbClient.connect()
//       const sql = `DELETE FROM order_products
//     WHERE order_id=$1 AND product_id=$2
//     Returning *`
//       const result = await conn.query(sql, [orderId, productId])
//       conn.release()
//       return result.rows[0]
//     } catch (error) {
//       throw new Error(`Cannot delete product from order. Error: ${error}`)
//     }
//   }

//   async getOrderProducts(
//       orderId: string,
//   ): Promise<OrderProduct[]> {
//     try {
//       const conn = await dbClient.connect()
//       const sql = `SELECT name, price, quantity, product_id
//     FROM  products INNER JOIN order_products
//     ON products.id=order_products.product_id
//     WHERE order_products.order_id=$1`
//       const result = await conn.query(sql, [orderId])
//       conn.release()
//       return result.rows
//     } catch (error) {
//       throw new Error(`Cannot get order products. Error: ${error}`)
//     }
//   }
// }
