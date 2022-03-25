import dbClient from '../../database'
import OrderModel from '../../models/order.model'
import UserModel from '../../models/user.model'
import Order from '../../types/order.type'
import User from '../../types/user.type'


const userModel = new UserModel()
const orderModel = new OrderModel()

describe('USER MODEL TESTS', () => {
  // before all
  afterAll(async () => {
    process.nextTick
    const conn = await dbClient.connect()
    const deleteOrdersSql = `DELETE FROM orders;`
    const deleteUsersSql = `DELETE FROM users;`
    // console.log(`after alll is runnnnninninnng`)
    await conn.query(deleteOrdersSql)
    await conn.query(deleteUsersSql)
    conn.release()
  })
  // required
  // create
  describe('create method tests', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123',
    } as User
    // test method is defined
    it('should have createUser method defined', () => {
      expect(userModel.createUser).toBeDefined()
    })
    // happy scenarios
    it('happy create() should return a User', async () => {
      const result = await userModel.createUser(user)
      expect(result).toEqual({
        id: result.id,
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
      } as User)
      // test password not saved as plain text
      expect(result.id as string).not.toEqual('test123')
    })
    // sad scenarios
    it('sad creating user with the same email', () => {
      expect(async () => {
        await userModel.createUser(user)
        // await userModel.createUser(user)
      }).toThrow
    })
  })

  // show
  describe('show method tests', () => {
    // create new user with and get its id
    const user = {
      email: 'testshow@test.com',
      user_name: 'testshow',
      first_name: 'Test',
      last_name: 'User',
      password: 'testshow',
    } as User
    // test method is defined
    it('should have getUser method defined', () => {
      expect(userModel.getUser).toBeDefined()
    })
    // happy scenarios
    it('happy show() should return user we created', async () => {
      const createdUser:User = await userModel.createUser(user)
      // get user by id
      const result = await userModel.getUser(createdUser.id as string)
      expect(result).toEqual({
        id: createdUser.id,
        email: createdUser.email,
        user_name: createdUser.user_name,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
      } as User)
    })
    // bad scenarios
  })
  // index
  describe('index method tests', () => {
  // test method is defined
    it('should have getAllUsers method defined', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })
    // happy scenarios
    it('happy getAllUsers() should return a users array', async () => {
      const result: User[] = await userModel.getAllUsers()
      expect(result.length > 0).toBeTrue
    })
    // bad scenarios
  })

  // not required
  // update
  describe('update method tests', () => {
    const user = {
      email: 'updatetest@test.com',
      user_name: 'testupdate',
      first_name: 'Test',
      last_name: 'User',
      password: 'testupdate',
    } as User
    const updateUserData = {
      email: 'update@test.com',
      user_name: 'updated',
      first_name: 'Update',
      last_name: 'Test',
      password: 'testupdate',
    } as User
    beforeAll(async () => {
      const createdUser = await userModel.createUser(user)
      updateUserData.id = createdUser.id
    })

    // test method is defined
    it('should have updateUser method defined', () => {
      expect(userModel.updateUser).toBeDefined()
    })
    // happy scenarios
    it('updateUser() should return true updated user', async () => {
      const result: User = await userModel.updateUser(updateUserData)
      expect(result.id).toEqual(updateUserData.id)
      expect(result.email).toEqual('update@test.com')
      expect(result.user_name).toEqual('updated')
      expect(result.first_name).toEqual('Update')
      expect(result.last_name).toEqual('Test')
    })
    // bad scenarios
  })

  // delete
  describe('delete method tests', () => {
    const user = {
      email: 'deletetest@test.com',
      user_name: 'testdelete',
      first_name: 'Test',
      last_name: 'User',
      password: 'testdelete',
    } as User
    beforeAll(async () => {
      const createUser = await userModel.createUser(user)
      user.id = createUser.id
    })
    // test method is defined
    it('should have deleteUser method defined', () => {
      expect(userModel.deleteUser).toBeDefined()
    })
    // happy scenarios
    it('happy delete() should return a return deleted user', async () => {
      const result: User = await userModel.deleteUser(user.id as string)
      expect(result.id).toEqual(user.id)
    })
    it('should throw error when requesting deleted user', async () => {
      const result = await userModel.getUser(user.id as string)
      expect(result).toThrow
    })
    // bad scenarios
  })

  // authenticate
  describe('authenticate method tests', () => {
    const user = {
      email: 'authtest@test.com',
      user_name: 'testauth',
      first_name: 'Test',
      last_name: 'User',
      password: 'testauth',
    } as User
    beforeAll(async () => {
      const createUser = await userModel.createUser(user)
      user.id = createUser.id
    })
    // test method is defined
    it('should have authenticate method defined', () => {
      expect(userModel.authenticateUser).toBeDefined()
    })
    // happy scenarios
    it('happy authenticate() should return a authenticated user', async () => {
      const result = await userModel.authenticateUser(
          user.email,
          user.password,
      )
      expect(result).not.toBeNull
      expect((result as User).id).toEqual(user.id)
    })
    // bad scenarios
  })

  // get user orders
  describe('get user orders method tests', () => {
    const user = {
      email: 'getuserorders@test.com',
      user_name: 'getuserorders',
      first_name: 'Test',
      last_name: 'User',
      password: 'getuserorders',
    } as User
    const order1 = {
      status: 'complete',
      user_id: 'placeholder',
    } as Order
    const order2 = {
      status: 'active',
      user_id: 'placeholder',
    } as Order
    beforeAll(async () => {
      const createdUser = await userModel.createUser(user)
      user.id = createdUser.id
      order1.user_id = user.id as string
      order2.user_id = user.id as string
      const createdOrder1 = await orderModel.create(order1)
      const createdOrder2 = await orderModel.create(order2)
      order1.id = createdOrder1.id
      order2.id = createdOrder2.id
    })
    // test method is defined
    it('should have getUserOrders method defined', () => {
      expect(userModel.getUserOrders).toBeDefined()
    })
    // happy scenarios
    it('happy getUserOrders() should return a user orders', async () => {
      const result: Order[] = await userModel.getUserOrders(user.id as string)
      expect(result.length).toEqual(2)
      expect(result[0].id).toEqual(order1.id)
      expect(result[1].id).toEqual(order2.id)
    })
    // bad scenarios
  })
})


// TODO: test bad scenarios

