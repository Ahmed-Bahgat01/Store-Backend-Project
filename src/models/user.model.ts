import User from '../types/user.type'
import dbClient from '../database'
class UserModel {
  // create user
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
        user.password,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create user. Error: ${error}`)
    }
  }
  // get all users
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
  // get specific user
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
  // update user
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
        user.password,
        user.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot update user. Error: ${error}`)
    }
  }
  // delete user
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
}
export default UserModel
