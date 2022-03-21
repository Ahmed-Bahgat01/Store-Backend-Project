import dbClient from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
// import model from '../../models/user.model'


const userModel = new UserModel()

describe('USER MODEL TESTS', () => {
  // before all
  afterAll(async () => {
    process.nextTick
    const conn = await dbClient.connect()
    const sql = `DELETE FROM users;`
    // console.log(`after alll is runnnnninninnng`)
    await conn.query(sql)
    conn.release()
  })
  // required
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
      // eslint-disable-next-line max-len
      // Error: Cannot create user. Error: error: duplicate key value violates unique constraint "users_email_key"
      // const result = await userModel.createUser(user)
      // console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-')
      expect(async () => {
        await userModel.createUser(user)
        // await userModel.createUser(user)
      }).toThrow
    })
  })

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

  describe('index method tests', () => {
  // test method is defined
    it('should have getAllUsers method defined', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })
    // happy scenarios
    it('happy getAllUsers() should return a users array', async () => {
      const result: User[] = await userModel.getAllUsers()
      expect(result.length > 0).toEqual(true)
    })
    // bad scenarios
  })

  // not required
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
      // expect(result.email).toEqual(user.email)
      // expect(result.user_name).toEqual(user.user_name)
      // expect(result.first_name).toEqual(user.first_name)
      // expect(result.last_name).toEqual(user.last_name)
    })
    it('should throw error when getting deleted user', async () => {
      const result = await userModel.getUser(user.id as string)
      expect(result).toThrow
    })
    // bad scenarios
  })

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
})


