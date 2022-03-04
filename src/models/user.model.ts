import User from '../types/user.type'
import dbClient from '../database'
class UserModel {
  // create user
  async createUser(user:User): Promise<User> {
    try {
      const conn = await dbClient.connect()
      const sql = `INSERT INTO users 
      (email, user_name, first_name, last_name, password) 
      values ($1, $2, $3, $4, $5) returning *`
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
  // get specific user
  // update user
  // delete user
  // authenticate user
}
export default UserModel
