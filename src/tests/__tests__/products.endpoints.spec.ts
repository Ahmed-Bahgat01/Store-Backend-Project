import app from '../../index'
import request from 'supertest'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'
import dbClient from '../../database'
import Product from '../../types/product.type'
import ProductModel from '../../models/product.model'

const userModel = new UserModel()
const productModel = new ProductModel()

describe('PRODUCTS ENDPOINTS TESTS', () => {
  const authUser = {
    email: '4authuser@test.com',
    user_name: '4authuser',
    first_name: 'Test',
    last_name: 'User',
    password: '4authuser',
  } as User

  const product = {
    name: 'testshow',
    price: 55,
  } as Product

  let userToken = ''
  beforeAll(async () => {
    // create user and athenticate him
    const createdUser = await userModel.createUser(authUser)
    authUser.id = createdUser.id

    // authenticate user
    const authenticatedUser = await userModel
        .authenticateUser(authUser.email, authUser.password)
    // get token
    const jwtoken = jwt.sign({
      authenticatedUser},
      config.jwtSecret as unknown as string)
    userToken = jwtoken

    // create product
    const createdProduct = await productModel.create(product)
    product.id = createdProduct.id
  })
  afterAll(async () => {
    const conn = await dbClient.connect()
    const deleteUsersSql = `DELETE FROM users;`
    const deleteProductsSql = `DELETE FROM products`
    await conn.query(deleteUsersSql)
    await conn.query(deleteProductsSql)
    conn.release()
  })

  // create product endpoint
  describe('create product endpoint', () => {
    it('happy scenario should return 200ok and product data ', async () => {
      const res = await request(app)
          .post('/api/products')
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
          .send({
            'name': 'new iphone',
            'price': '9999999',
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('product created')
    })
  })

  // test index endpoint
  describe('get all products endpoint', () => {
    it('happy scenario should return 200ok and userslist ', async () => {
      const res = await request(app)
          .get('/api/products')
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('products returned successfully')
    })
  })

  // test show endpoint
  describe('get product endpoint', () => {
    it('happy scenario should return 200ok and product data ', async () => {
      const res = await request(app)
          .get(`/api/products/${product.id as string}`)
          .set('Content-type', 'application/json')
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.id).toEqual(product.id)
      expect(res.body.message).toEqual('product returned successfully')
    })
  })

  // test update endpoint
  describe('update product endpoint', () => {
    it('happy scenario should return 200ok & new product data ', async () => {
      const updateProductPrice = 96
      const res = await request(app)
          .patch(`/api/products/${product.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
          .send({
            'name': product.name,
            'price': updateProductPrice, // update price of the product
          })
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.price).toEqual(updateProductPrice)
      expect(res.body.message).toEqual('product updated successfully')
    })
  })

  // test delete endpoint
  describe('delete user endpoint', () => {
    // creating product
    const product4Delete = {
      name: '4delete',
      price: 96,
    } as Product
    beforeAll(async () => {
      // create producy by productModel
      const createdProduct = await productModel.create(product4Delete)
      product4Delete.id = createdProduct.id
    })
    it('happy should return 200ok & deleted product data ', async () => {
      const res = await request(app)
          .delete(`/api/products/${product4Delete.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', 'bearer ' + userToken)
      expect(res.statusCode).toEqual(200)
      expect(res.body.data.id).toEqual(product4Delete.id)
      expect(res.body.message).toEqual('product deleted successfully')
    })
  })
})
