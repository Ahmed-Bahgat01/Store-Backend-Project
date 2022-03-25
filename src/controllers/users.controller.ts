import {Request, Response, NextFunction} from 'express'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../types/user.type'

const userModel = new UserModel()

// create
export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const user = await userModel.createUser(req.body)
    res.json({
      Status: 'success',
      data: {...user},
      message: 'user created',
    })
  } catch (error) {
    next(error)
  }
}

// index
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const users = await userModel.getAllUsers()
    res.json({
      Status: 'success',
      data: users,
      message: 'users returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const user = await userModel.getUser(req.params.id as unknown as string)
    console.log(`user: ${user}`)
    if (typeof(user) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist user',
      })
    }
    res.json({
      Status: 'success',
      data: user,
      message: 'user returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

// update
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const toBeUpdatedUser: User = req.body
    toBeUpdatedUser.id = req.params.id
    const updatedUser = await userModel.updateUser(toBeUpdatedUser)
    if (typeof(updatedUser) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist user',
      })
    }
    res.json({
      Status: 'success',
      data: updatedUser,
      message: 'user updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

// delete
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const deletedUser = await userModel.
        deleteUser(req.params.id as unknown as string)
    if (typeof(deletedUser) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist user',
      })
    }
    res.json({
      Status: 'success',
      data: deletedUser,
      message: 'user deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// auth
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const {email, password} = req.body
    const user = await userModel.authenticateUser(email, password)
    const jwtoken = jwt.sign({user}, config.jwtSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'invalid credentials',
      })
    }
    res.json({
      Status: 'success',
      data: {...user, jwtoken},
      message: 'user authenticated successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getUserOrders = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const userOrders = await userModel.
        getUserOrders(req.params.id as unknown as string)
    if (userOrders.length === 0) {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist user',
      })
    }
    res.json({
      Status: 'success',
      data: userOrders,
      message: 'user orders achieved successfully',
    })
  } catch (error) {
    next(error)
  }
}

