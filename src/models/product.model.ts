import dbClient from '../database'
import Product from '../types/product.type'

class ProductModel {
  // create
  async create(product: Product): Promise<Product> {
    try {
      const conn = await dbClient.connect()
      const sql = `INSERT INTO products(name, price) 
      values ($1, $2) 
      RETURNING *`
      const result = await conn.query(sql, [
        product.name,
        product.price,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create product. Error: ${error}`)
    }
  }

  // get all products
  async index(): Promise<Product[]> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT name, price FROM products`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot index products. Error: ${error}`)
    }
  }

  // show
  async show(id: string): Promise<Product> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT * FROM products WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get product. Error: ${error}`)
    }
  }

  // update
  async update(product: Product): Promise<Product> {
    try {
      const conn = await dbClient.connect()
      const sql = `UPDATE products 
      SET name=$1, price=$2
      WHERE id=$3
      RETURNING *`
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot update product. Error: ${error}`)
    }
  }

  // delete
  async delete(id: string): Promise<Product> {
    try {
      const conn = await dbClient.connect()
      const sql = `DELETE FROM products 
      WHERE id=$1
      RETURNING *`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot delete product. Error: ${error}`)
    }
  }
}
export default ProductModel
