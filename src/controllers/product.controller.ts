import {Request, Response, NextFunction} from 'express'
import ProductModel from '../models/product.model'
import Product from '../types/product.type'

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
    if (typeof(product) == 'undefined') {
      res.json({
        Status: 'failed',
        message: 'not exist product',
      })
    }
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
    const toBeUpdatedProduct: Product = req.body
    toBeUpdatedProduct.id = req.params.id
    const updatedProduct = await productModel.update(toBeUpdatedProduct)
    if (typeof(updatedProduct) == 'undefined') {
      res.json({
        Status: 'failed',
        message: 'not exist product',
      })
    }
    res.json({
      Status: 'success',
      data: updatedProduct,
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
    if (typeof(deletedProduct) == 'undefined') {
      res.json({
        Status: 'failed',
        message: 'not exist product',
      })
    }
    res.json({
      Status: 'success',
      data: deletedProduct,
      message: 'product deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
