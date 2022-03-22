import User from '../types/user.type'
import dbClient from '../database'
import config from '../config'
import bcrypt from 'bcrypt'
import Order from '../types/order.type'

const hashPassword = (password: string) => {
  const salt = parseInt(config.saltRounds as string, 10)
  return bcrypt.hashSync(`${password}${config.password_pepper}`, salt)
}
class UserModel {
  // create
  async createUser(user:User): Promise<User> {
    try {
      const conn = await dbClient.connect()
      const sql = `INSERT INTO users 
      (email, user_name, first_name, last_name, password) 
      values ($1, $2, $3, $4, $5) 
      returning id, email, user_name, first_name, last_name`
      const result = await conn.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        // user.password,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create user. Error: ${error}`)
    }
  }
  // index
  async getAllUsers(): Promise<User[]> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT 
      id, 
      email, 
      user_name, 
      first_name, 
      last_name 
      FROM users`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get users. Error: ${error}`)
    }
  }
  // show
  async getUser(id: string): Promise<User> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT id, email, user_name, first_name, last_name 
      FROM users WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get user. Error: ${error}`)
    }
  }
  // update
  async updateUser(user: User): Promise<User> {
    try {
      const conn = await dbClient.connect()
      const sql = `UPDATE users 
      SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5
      WHERE id=$6
      RETURNING id, email, user_name, first_name, last_name`
      const result = await conn.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        user.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot update user. Error: ${error}`)
    }
  }
  // delete
  async deleteUser(id: string): Promise<User> {
    try {
      const conn = await dbClient.connect()
      const sql = `DELETE FROM users 
      WHERE id=$1
      RETURNING id, email, user_name, first_name, last_name`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot delete user. Error: ${error}`)
    }
  }
  // authenticate user
  async authenticateUser(email: string, password: string): Promise<User|null> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT password FROM users WHERE email=$1`
      const result = await conn.query(sql, [email] )
      if (result.rows.length) {
        // needs explain
        const {password: hashPassword} = result.rows[0] // neeeeds explain
        const isValidPassword = bcrypt.compareSync(
            `${password}${config.password_pepper}`,
            hashPassword,
        )
        if (isValidPassword) {
          const userData = await conn.query(
              `SELECT id, email, user_name, first_name, last_name 
              FROM users 
              WHERE email=$1`,
              [email],
          )
          conn.release
          return userData.rows[0]
        }
      }
      conn.release
      return null
    } catch (error) {
      throw new Error(`Cannot authenticate user. Error: ${error}`)
    }
  }

  // get orders of user
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await dbClient.connect()
      const sql = `SELECT id, status FROM orders WHERE user_id=$1`
      const result = await conn.query(sql, [userId])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get user orders. Error: ${error}`)
    }
  }
}
export default UserModel
