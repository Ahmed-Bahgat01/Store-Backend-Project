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
export const usersHello = (req: Request, res: Response) => {
  res.json({
    message: 'hello world from users',
  })
}
