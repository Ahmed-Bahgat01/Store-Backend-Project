import app from '../../index'
import request from 'supertest'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'
import dbClient from '../../database'
import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'
import Product from '../../types/product.type'
import ProductModel from '../../models/product.model'
import OrderProduct from '../../types/order_product.type'

const userModel = new UserModel()
const orderModel = new OrderModel()
const productModel = new ProductModel()

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
    const deleteOrderProductsSql = `DELETE FROM order_products`
    const deleteOrderssSql = `DELETE FROM orders`
    const deleteUsersSql = `DELETE FROM users;`
    await conn.query(deleteOrderProductsSql)
    await conn.query(deleteOrderssSql)
    await conn.query(deleteUsersSql)
    conn.release()
  })

  // test create endpoint
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

  // test index endpoint
  describe('get all orders endpoint', () => {
    it('happy scenario should return 200ok and ordersList ', async () => {
      const res = await request(app)
          .get('/api/orders')
          .set('Content-type', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('orders returned successfully')
    })
  })

  // test show endpoint
  describe('get order endpoint', () => {
    it('happy scenario should return 200ok and order data ', async () => {
      const res = await request(app)
          .get(`/api/orders/${order.id as string}`)
          .set('Content-type', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('order returned successfully')
    })
  })

  // test update endpoint
  describe('update order endpoint', () => {
    it('happy scenario should return 200ok & updated order data ', async () => {
      const updateOrderStatus = 'completed'
      const res = await request(app)
          .patch(`/api/orders/${order.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
          .send({
            'status': updateOrderStatus, // udpate status to completed
            'user_id': user.id,
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.status).toEqual(updateOrderStatus)
      expect(res.body.message).toEqual('order updated successfully')
    })
  })

  // test delete endpoint
  describe('delete order endpoint', () => {
    // creating order
    const order4Delete = {
      status: 'active',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      // create user by userModel
      const createdOrder = await orderModel.create(order4Delete)
      order4Delete.id = createdOrder.id
    })
    it('happy scenario should return 200ok & deleted order data ', async () => {
      const res = await request(app)
          .delete(`/api/orders/${order4Delete.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.id).toEqual(order4Delete.id)
      expect(res.body.message).toEqual('order deleted successfully')
    })
  })

  // test (add product to order) endpiont
  describe('add product to order endpoint', () => {
    const testProduct = {
      name: 'keyboard',
      price: 20,
    } as Product
    beforeAll(async () => {
      // create product
      const createdProduct = await productModel.create(testProduct)
      testProduct.id = createdProduct.id as string
    })
    it('happy scenario should return 200ok & orderproduct data ', async () => {
      const res = await request(app)
          .post(`/api/orders/${order.id as string}/products`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
          .send({
            'quantity': '2',
            'product_id': testProduct.id,
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.product_id).toEqual(testProduct.id)
      expect(res.body.message).toEqual('product added to order successfully')
    })
  })

  // test (delete product from order)
  describe('delete product from order endpoint', () => {
    const product4Delete = {
      name: '4delete',
      price: 96,
    } as Product
    const orderProduct = {
      quantity: 5,
      order_id: 'temp',
      product_id: 'temp',
    } as OrderProduct

    beforeAll(async () => {
      // create product
      const createdProduct = await productModel.create(product4Delete)
      product4Delete.id = createdProduct.id as string
      orderProduct.order_id = order.id
      orderProduct.product_id = product4Delete.id as string

      // add product to order
      const addProductToOrder = await orderModel.addProduct(orderProduct)
      orderProduct.id = addProductToOrder.id as string
    })
    it('happy scenario should return 200ok & orderproduct data', async () => {
      const res = await request(app)
          .delete(`/api/orders/${order.id}/products/${product4Delete.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.product_id).toEqual(product4Delete.id)
      expect(res.body.message)
          .toEqual('product deleted from order successfully')
    })
  })

  // test (get products in order) endpiont
  describe('get order products endpoint', () => {
    const product1 = {
      name: 'product1',
      price: 56,
    } as Product
    const product2 = {
      name: 'product2',
      price: 56,
    } as Product
    const orderProduct1 = {
      quantity: 5,
      order_id: 'temp',
      product_id: 'temp',
    } as OrderProduct
    const orderProduct2 = {
      quantity: 7,
      order_id: 'temp',
      product_id: 'temp',
    } as OrderProduct

    beforeAll(async () => {
      // create products
      const createdProduct1 = await productModel.create(product1)
      const createdProduct2 = await productModel.create(product2)
      product1.id = createdProduct1.id as string
      product2.id = createdProduct2.id as string
      orderProduct1.product_id = product1.id
      orderProduct2.product_id = product2.id
      orderProduct1.order_id = order.id
      orderProduct2.order_id = order.id
      // add products to order
      const addProduct1ToOrder = await orderModel.addProduct(orderProduct1)
      const addProduct2ToOrder = await orderModel.addProduct(orderProduct2)
      orderProduct1.id = addProduct1ToOrder.id
      orderProduct2.id = addProduct2ToOrder.id
    })
    it('happy scenario should return 200ok & orderproduct list', async () => {
      const res = await request(app)
          .get(`/api/orders/${order.id}/products`)
          .set('Content-type', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.length).toEqual(2)
      expect(res.body.message)
          .toEqual('order products returned successfully')
    })
  })
})

