import {Request, Response, NextFunction} from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel

// create
export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const order = await orderModel.create(req.body)
    res.json({
      Status: 'success',
      data: {...order},
      message: 'user created',
    })
  } catch (error) {
    next(error)
  }
}

// index
export const getAllOrders = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const orders = await orderModel.index()
    res.json({
      Status: 'success',
      data: orders,
      message: 'orders returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

// show
export const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const order = await orderModel.show(req.params.id as unknown as string)
    res.json({
      Status: 'success',
      data: order,
      message: 'order returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

// update
export const updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const updatedOrder = await orderModel.update(req.body)
    res.json({
      Status: 'success',
      data: updatedOrder,
      message: 'order updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

// delete
export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const deletedOrder = await orderModel.
        delete(req.params.id as unknown as string)
    res.json({
      Status: 'success',
      data: deletedOrder,
      message: 'order deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// add product
export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const quantity: number = parseInt(req.body.quantity)
    const orderId: string = req.params.id
    const productId: string = req.body.product_id
    const addedProduct = await orderModel.
        addProduct(quantity, orderId, productId)
    res.json({
      Status: 'success',
      data: addedProduct,
      message: 'product added to order successfully',
    })
  } catch (error) {
    next(error)
  }
}
