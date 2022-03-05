import {Request, Response} from 'express'
import UserModel from '../models/user.model'

const userModel = new UserModel()

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.createUser(req.body)
    res.json({
      Status: 'success',
      data: {...user},
      message: 'user created',
    })
  } catch (error) {
    throw new Error(`cannot create user from user controller: ${error}`)
  }
}
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getAllUsers()
    res.json({
      Status: 'success',
      data: users,
      message: 'users returned successfully',
    })
  } catch (error) {
    throw new Error(`cannot get all users from user controller: ${error}`)
  }
}
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.getUser(req.params.id as unknown as string)
    res.json({
      Status: 'success',
      data: user,
      message: 'user returned successfully',
    })
  } catch (error) {
    throw new Error(`cannot get user from user controller: ${error}`)
  }
}
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userModel.updateUser(req.body)
    res.json({
      Status: 'success',
      data: updatedUser,
      message: 'user updated successfully',
    })
  } catch (error) {
    throw new Error(`cannot update user from user controller: ${error}`)
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await userModel.
        deleteUser(req.params.id as unknown as string)
    res.json({
      Status: 'success',
      data: deletedUser,
      message: 'user deleted successfully',
    })
  } catch (error) {
    throw new Error(`cannot delete user from user controller: ${error}`)
  }
}
// export const usersHello = (req: Request, res: Response) => {
//   res.json({
//     message: 'hello world from users',
//   })
// }
