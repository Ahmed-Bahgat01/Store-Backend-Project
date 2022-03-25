import {Request, Response, NextFunction} from 'express'
import OrderModel from '../models/order.model'
import Order from '../types/order.type'
import OrderProduct from '../types/order_product.type'

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
      message: 'order created',
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
    if (typeof(order) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist order',
      })
    }
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
    const toBeUpdatedOrder: Order = req.body
    toBeUpdatedOrder.id = req.params.id
    const updatedOrder = await orderModel.update(toBeUpdatedOrder)
    if (typeof(updatedOrder) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist order',
      })
    }
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
    if (typeof(deletedOrder) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist order',
      })
    }
    res.json({
      Status: 'success',
      data: deletedOrder,
      message: 'order deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// add product to order
export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const orderProduct: OrderProduct = req.body
    orderProduct.order_id = req.params.id
    const addedProduct = await orderModel.
        addProduct(orderProduct)
    if (
      addedProduct.order_id == null ||
      typeof(addedProduct.order_id) == 'undefined'
    ) {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist order',
      })
    } else if (
      addedProduct.product_id == null ||
      typeof(addedProduct.product_id) == 'undefined'
    ) {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist product',
      })
    }
    res.json({
      Status: 'success',
      data: addedProduct,
      message: 'product added to order successfully',
    })
  } catch (error) {
    next(error)
  }
}

// delete product from order
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const orderId: string = req.params.id
    const productId: string = req.params.pid
    const deletedProduct = await orderModel.
        deleteProduct(orderId, productId)
    if (typeof(deletedProduct) == 'undefined') {
      return res.status(404).json({
        Status: 'error',
        message: 'not exist order or product',
      })
    }
    res.json({
      Status: 'success',
      data: deletedProduct,
      message: 'product deleted from order successfully',
    })
  } catch (error) {
    next(error)
  }
}

// get order products
export const getOrderProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const orderId: string = req.params.id
    const orderProducts = await orderModel.
        getOrderProducts(orderId)
    if (orderProducts.length === 0) {
      const getOrder = await orderModel.show(orderId)
      if (typeof(getOrder) == 'undefined') {
        return res.status(404).json({
          Status: 'error',
          message: 'not exist order',
        })
      }
    }
    res.json({
      Status: 'success',
      data: orderProducts,
      message: 'order products returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

