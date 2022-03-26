import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'
import dbClient from '../../database'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import Product from '../../types/product.type'
import ProductModel from '../../models/product.model'
import OrderProduct from '../../types/order_product.type'

const userModel = new UserModel()
const orderModel = new OrderModel()
const productModel = new ProductModel()

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
    const conn = await dbClient.connect()
    const deleteOrdersSql = `DELETE FROM orders;`
    const deleteUsersSql = `DELETE FROM users;`
    const deleteProductsSql = `DELETE FROM products`
    const deleteOrderProductsSql = `DELETE FROM order_products`
    await conn.query(deleteOrderProductsSql)
    await conn.query(deleteOrdersSql)
    await conn.query(deleteUsersSql)
    await conn.query(deleteProductsSql)
    conn.release()
  })
  describe('create method tests', () => {
    // test method is defined
    it('should have create method defined', () => {
      expect(orderModel.create).toBeDefined()
    })
    it('happy create() should return created order', async () => {
      const order = {
        status: 'delivered',
        user_id: user.id,
      } as Order
      const result: Order = await orderModel.create(order)
      expect(result).toBeTruthy
      expect(result.user_id).toEqual(user.id as string)
    })
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
    it('happy show() should return requested order data', async () => {
      const result = await orderModel.show(order.id as string)
      expect(result.id).toEqual(order.id)
    })
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
    it('happy delete() should return deleted order', async () => {
      const result: Order = await orderModel.delete(order.id as string)
      expect(result.id).toEqual(order.id)
    })
    it('should throw error when equesting deleted user', async () => {
      const result: Order = await orderModel.show(order.id as string)
      expect(result).toThrow
    })
  })


  // add product to order
  describe('add Product method tests', () => {
    const product = {
      name: 'keyboard',
      price: 20,
    } as Product
    const order = {
      status: 'active',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      // create product
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id as string
      // create order
      const createdOrder = await orderModel.create(order)
      order.id = createdOrder.id as string
    })
    // test method is defined
    it('should have addProduct method defined', () => {
      expect(orderModel.addProduct).toBeDefined()
    })
    it('happy addProduct() should return orderProduct', async () => {
      const orderProduct = {
        quantity: 20,
        order_id: order.id as string,
        product_id: product.id as string,
      } as OrderProduct
      const result: OrderProduct = await orderModel.addProduct(orderProduct)
      expect(result.order_id).toEqual(order.id)
      expect(result.product_id).toEqual(product.id as string)
    })
  })

  // delete product from order
  describe('delete Product method tests', () => {
    const product = {
      name: 'prolom',
      price: 20,
    } as Product
    const order = {
      status: 'active',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      // create product
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id as string
      // create order
      const createdOrder = await orderModel.create(order)
      order.id = createdOrder.id as string
    })
    // test method is defined
    it('should have deleteProduct method defined', () => {
      expect(orderModel.deleteProduct).toBeDefined()
    })
    it('happy deleteProduct() should return deleted OrderProduct', async () => {
      const orderProduct = {
        quantity: 20,
        order_id: order.id as string,
        product_id: product.id as string,
      } as OrderProduct
      // add product to order
      const createdOrderProduct: OrderProduct = await orderModel
          .addProduct(orderProduct)
      const result = await orderModel
          .deleteProduct(
            createdOrderProduct.order_id as string,
            createdOrderProduct.product_id,
          )
      expect(result.order_id).toEqual(orderProduct.order_id)
      expect(result.product_id).toEqual(orderProduct.product_id)
    })
  })

  // get Order Products
  describe('get order products method tests', () => {
    const product1 = {
      name: 'tralam',
      price: 79,
    } as Product
    const product2 = {
      name: 'domtac',
      price: 96,
    } as Product
    const order = {
      status: 'active',
      user_id: user.id,
    } as Order
    beforeAll(async () => {
      // create products
      const createdProduct1 = await productModel.create(product1)
      const createdProduct2 = await productModel.create(product2)
      product1.id = createdProduct1.id as string
      product2.id = createdProduct2.id as string

      // create order
      const createdOrder = await orderModel.create(order)
      order.id = createdOrder.id as string
    })
    // test method is defined
    it('should have getOrderProducts method defined', () => {
      expect(orderModel.getOrderProducts).toBeDefined()
    })
    it('happy getOrderProducts() should return Order Products', async () => {
      const orderProduct1 = {
        quantity: 20,
        order_id: order.id as string,
        product_id: product1.id as string,
      } as OrderProduct
      const orderProduct2 = {
        quantity: 90,
        order_id: order.id as string,
        product_id: product2.id as string,
      } as OrderProduct

      // add products to order
      await orderModel.addProduct(orderProduct1)
      await orderModel.addProduct(orderProduct2)

      const result = await orderModel
          .getOrderProducts( order.id as string)
      expect(result.length).toEqual(2)
      expect(result[0].product_id).toEqual(orderProduct1.product_id)
      expect(result[1].product_id).toEqual(orderProduct2.product_id)
    })
  })
})

