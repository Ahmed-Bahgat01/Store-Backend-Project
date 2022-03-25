import app from '../../index'
import request from 'supertest'
import dbClient from '../../database'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'

const userModel = new UserModel()

describe('USERS ENDPOINTS TESTS', () => {
  const user = {
    email: '4authuser@test.com',
    user_name: '4authuser',
    first_name: 'Test',
    last_name: 'User',
    password: '4authuser',
  } as User
  let userToken = ''
  beforeAll(async () => {
    // create user by userModel
    const createdUser = await userModel.createUser(user)
    user.id = createdUser.id

    // authenticate user
    const authenticatedUser = await userModel
        .authenticateUser(user.email, user.password)
    // get token
    const jwtoken = jwt.sign({
      authenticatedUser},
      config.jwtSecret as unknown as string)
    userToken = jwtoken
  })
  afterAll(async () => {
    const conn = await dbClient.connect()
    // const deleteOrdersSql = `DELETE FROM orders;`
    const deleteUsersSql = `DELETE FROM users;`
    // console.log(`after alll is runnnnninninnng`)
    // await conn.query(delete‌OrdersSql)
    await conn.query(deleteUsersSql)
    conn.release()
  })
  describe('create user endpoint', () => {
    it('happy scenario should return 200ok and user data ', async () => {
      const res = await request(app)
          .post('/api/users')
          .set('Content-type', 'application/json')
          // .set('Authorization', 'token')
          .send({
            'email': 'testcreateendpoint@test.com',
            'user_name': 'testcreateendpoint',
            'first_name': 'Ahmed',
            'last_name': 'Bahgat',
            'password': 'testcreateendpoint',
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.Status).toEqual('success')
      expect(res.body.data.email).toEqual('testcreateendpoint@test.com')
      expect(res.body.message).toEqual('user created')
    })
    it('sad scenario (existing email) should return 500', async () => {
      const res1 = await request(app)
          .post('/api/users')
          .set('Content-type', 'application/json')
          // .set('Authorization', 'token')
          .send({
            'email': 'testbadcreateendpoint@test.com',
            'user_name': 'testcreateendpoint',
            'first_name': 'Ahmed',
            'last_name': 'Bahgat',
            'password': 'testbadcreateendpoint',
          })
      const res2 = await request(app)
          .post('/api/users')
          .set('Content-type', 'application/json')
      // .set('Authorization', 'token')
          .send({
            'email': res1.body.data.email,
            'user_name': 'testcreateendpoint',
            'first_name': 'Ahmed',
            'last_name': 'Bahgat',
            'password': 'testbadcreateendpoint',
          })
      expect(res2.statusCode).toEqual(500)
    })
  })

  // test index
  describe('get all users endpoint', () => {
    it('happy scenario should return 200ok and userslist ', async () => {
      const res = await request(app)
          .get('/api/users')
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data[0].id).toEqual(user.id)
      expect(res.body.message).toEqual('users returned successfully')
    })
  })

  // test show
  describe('get user endpoint', () => {
    it('happy scenario should return 200ok and user data ', async () => {
      const res = await request(app)
          .get(`/api/users/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.id).toEqual(user.id)
      expect(res.body.message).toEqual('user returned successfully')
    })
  })
})
