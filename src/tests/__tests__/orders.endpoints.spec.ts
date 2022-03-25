import app from '../../index'
import request from 'supertest'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'
import dbClient from '../../database'
import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'

const userModel = new UserModel()
const orderModel = new OrderModel()

describe('ORDERS ENDPOINTS TESTS', () => {
  const user = {
    email: '4authuser@test.com',
    user_name: '4authuser',
    first_name: 'Test',
    last_name: 'User',
    password: '4authuser',
  } as User

  const order = {
    status: 'active',
    user_id: user.id,
  } as Order

  let userToken = ''
  beforeAll(async () => {
    // create user and athenticate him
    const createdUser = await userModel.createUser(user)
    user.id = createdUser.id

    // set user_id in order
    order.user_id = user.id as string

    // authenticate user
    const authenticatedUser = await userModel
        .authenticateUser(user.email, user.password)
    // get token
    const jwtoken = jwt.sign({
      authenticatedUser},
      config.jwtSecret as unknown as string)
    userToken = jwtoken

    // create product
    const createdOrder = await orderModel.create(order)
    order.id = createdOrder.id
  })
  afterAll(async () => {
    const conn = await dbClient.connect()
    const deleteOrderssSql = `DELETE FROM orders`
    const deleteUsersSql = `DELETE FROM users;`
    await conn.query(deleteOrderssSql)
    await conn.query(deleteUsersSql)
    conn.release()
  })

  describe('create order endpoint', () => {
    it('happy scenario should return 200ok and order data ', async () => {
      const res = await request(app)
          .post('/api/orders')
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
          .send({
            'status': 'complete',
            'user_id': user.id as string,
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('order created')
    })
  })

  describe('get all orders endpoint', () => {
    it('happy scenario should return 200ok and ordersList ', async () => {
      const res = await request(app)
          .get('/api/orders')
          .set('Content-type', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('orders returned successfully')
    })
  })

  describe('get order endpoint', () => {
    it('happy scenario should return 200ok and order data ', async () => {
      const res = await request(app)
          .get(`/api/orders/${order.id as string}`)
          .set('Content-type', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('order returned successfully')
    })
  })
})
