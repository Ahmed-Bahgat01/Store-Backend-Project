import {Request, Response, NextFunction} from 'express'
// import OrderModel from '../models/order.model'
import ProductModel from '../models/product.model'

const productModel = new ProductModel

// create
export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      Status: 'success',
      data: {...product},
      message: 'product created',
    })
  } catch (error) {
    next(error)
  }
}

// index
export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const products = await productModel.index()
    res.json({
      Status: 'success',
      data: products,
      message: 'products returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

// show
export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const product = await productModel.show(req.params.id as unknown as string)
    res.json({
      Status: 'success',
      data: product,
      message: 'product returned successfully',
    })
  } catch (error) {
    next(error)
  }
}

// update
export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const updatedOrder = await productModel.update(req.body)
    res.json({
      Status: 'success',
      data: updatedOrder,
      message: 'product updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

// delete
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const deletedProduct = await productModel.
        delete(req.params.id as unknown as string)
    res.json({
      Status: 'success',
      data: deletedProduct,
      message: 'product deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
