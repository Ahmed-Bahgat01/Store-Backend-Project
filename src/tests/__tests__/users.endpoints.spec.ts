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
    const deleteUsersSql = `DELETE FROM users;`
    await conn.query(deleteUsersSql)
    conn.release()
  })

  // test create user endpoint
  describe('create user endpoint', () => {
    it('happy scenario should return 200ok and user data ', async () => {
      const res = await request(app)
          .post('/api/users')
          .set('Content-type', 'application/json')
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

  // test update
  describe('update user endpoint', () => {
    it('happy scenario should return 200ok & updated user data ', async () => {
      const updateFirstName = 'updated'
      const res = await request(app)
          .patch(`/api/users/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
          .send({
            'email': user.email,
            'user_name': user.user_name,
            'first_name': updateFirstName, // update first name to updated
            'last_name': user.last_name,
            'password': user.password,
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.first_name).toEqual(updateFirstName)
      expect(res.body.message).toEqual('user updated successfully')
    })
  })

  // test delete
  describe('delete user endpoint', () => {
    // creating user
    const user4Delete = {
      email: '4delete@test.com',
      user_name: '4delete',
      first_name: 'Test',
      last_name: 'User',
      password: '4delete',
    } as User
    let user4DeleteToken = ''
    beforeAll(async () => {
      // create user by userModel
      const createdUser = await userModel.createUser(user4Delete)
      user4Delete.id = createdUser.id
      // authenticate user4delete
      const authenticatedUser = await userModel
          .authenticateUser(user4Delete.email, user4Delete.password)
      // get token
      const jwtoken = jwt.sign({
        authenticatedUser},
        config.jwtSecret as unknown as string)
      user4DeleteToken = jwtoken
    })
    it('happy scenario should return 200ok & deleted user data ', async () => {
      const res = await request(app)
          .delete(`/api/users/${user4Delete.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + user4DeleteToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.id).toEqual(user4Delete.id)
      expect(res.body.message).toEqual('user deleted successfully')
    })
  })

  // test authenticate
  describe('authenticate user endpoint', () => {
    it('happy scenario should return 200ok, user data & jwtoken ', async () => {
      const res = await request(app)
          .post(`/api/users/authenticate`)
          .set('Content-type', 'application/json')
          .send({
            'email': user.email,
            'password': user.password,
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.id).toEqual(user.id)
      expect(res.body.data.jwtoken).toBeTruthy
      expect(res.body.message).toEqual('user authenticated successfully')
    })
  })

  // test get user orders
  describe('get user orders endpoint', () => {
    it('happy scenario should return 200ok and user data ', async () => {
      const res = await request(app)
          .get(`/api/users/${user.id}/orders`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.length).toEqual(0)
      expect(res.body.message).toEqual('user orders achieved successfully')
    })
  })
})
