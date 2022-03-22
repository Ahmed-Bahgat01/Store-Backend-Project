import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'
import dbClient from '../../database'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
// import ProductModel from '../../models/product.model'
// import Product from '../../types/product.type'

const userModel = new UserModel()
const orderModel = new OrderModel()
// const productModel = new ProductModel()

describe('ORDER MODEL TESTS', () => {
  const user = {
    email: 'testorders@test.com',
    user_name: 'testOrder',
    first_name: 'Test',
    last_name: 'User',
    password: 'testpassword',
  } as User

  beforeAll(async () => {
    const createUser = await userModel.createUser(user)
    user.id = createUser.id
  })

  afterAll(async () => {
    // process.nextTick
    const conn = await dbClient.connect()
    const deleteOrdersSql = `DELETE FROM orders;`
    const deleteUsersSql = `DELETE FROM users;`
    await conn.query(deleteOrdersSql)
    await conn.query(deleteUsersSql)
    conn.release()
  })
  describe('create method tests', () => {
    // test method is defined
    it('should have create method defined', () => {
      expect(orderModel.create).toBeDefined()
    })
    // happy scenarios
    it('happy create() should return created order', async () => {
      const order = {
        status: 'delivered',
        user_id: user.id,
      } as Order
      const result: Order = await orderModel.create(order)
      expect(result).toBeTruthy
      expect(result.user_id).toEqual(user.id as string)
    })
    // bad scenarios
  })

  describe('index method tests', () => {
    // test method is defined
    it('should have index method defined', () => {
      expect(orderModel.index).toBeDefined()
    })
    // happy scenarios
    it('happy index() should return orders array', async () => {
      const result: Order[] = await orderModel.index()
      expect(result.length > 0).toBeTrue
    })
    // bad scenarios
  })

  describe('show method tests', () => {
    const order = {
      status: 'shipping',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      const createdOrder:Order = await orderModel.create(order)
      order.id = createdOrder.id
    })
    // test method is defined
    it('should have show method defined', () => {
      expect(orderModel.show).toBeDefined()
    })
    // happy scenarios
    it('happy show() should return requested order data', async () => {
      const result = await orderModel.show(order.id as string)
      expect(result.id).toEqual(order.id)
    })
    // bad scenarios
  })

  describe('update method tests', () => {
    const order = {
      status: 'shipping',
      user_id: user.id,
    } as Order
    const updateOrderData = {
      status: 'delivered',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      const createdOrder = await orderModel.create(order)
      updateOrderData.id = createdOrder.id
    })
    // test method is defined
    it('should have update method defined', () => {
      expect(orderModel.update).toBeDefined()
    })
    // happy scenarios
    it('happy update() should return updated order data', async () => {
      const result: Order = await orderModel.update(updateOrderData)
      expect(result.id).toEqual(updateOrderData.id)
      expect(result.status).toEqual(updateOrderData.status)
    })
    // bad scenarios
  })

  // delete
  describe('delete method tests', () => {
    const order = {
      status: 'shipping',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      const createdOrder = await orderModel.create(order)
      order.id = createdOrder.id
    })
    // test method is defined
    it('should have delete method defined', () => {
      expect(orderModel.delete).toBeDefined()
    })
    // happy scenarios
    it('happy delete() should return deleted order', async () => {
      const result: Order = await orderModel.delete(order.id as string)
      expect(result.id).toEqual(order.id)
    })
    it('should throw error when equesting deleted user', async () => {
      const result: Order = await orderModel.show(order.id as string)
      expect(result).toThrow
    })
    // bad scenarios
  })

  // add product
  // describe('add Product method tests', () => {
  //   const product = {
  //     name: 'keyboard',
  //     price: 20,
  //   } as Product
  //   const order = {
  //     status: 'shipping',
  //     user_id: user.id,
  //   } as Order
  //   beforeAll(async () => {
  //     // create product
  //     const createdProduct = await productModel.create(product)
  //     product.id = createdProduct.id
  //     // create order
  //     const createdOrder = await orderModel.create(order)
  //     order.id = createdOrder.id
  //   })
  //   // test method is defined
  //   it('should have addProduct method defined', () => {
  //     expect(orderModel.addProduct).toBeDefined()
  //   })
  //   // happy scenarios
  //   it('happy addProduct() should return orders array', async () => {
  //     const result: Order = await orderModel.index()
  //     // expect(result.length > 0).toBeTrue
  //   })
  //   // bad scenarios
  // })
})

