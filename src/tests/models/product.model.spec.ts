import Product from '../../types/product.type'
import ProductModel from '../../models/product.model'
import dbClient from '../../database'

const productModel = new ProductModel()

describe('PRODUCT MODEL TESTS', () => {
  const product = {
    name: 'testproduct',
    price: 100,
  } as Product

  beforeAll(async () => {
    const createdProduct = await productModel.create(product)
    product.id = createdProduct.id
  })

  afterAll(async () => {
    const conn = await dbClient.connect()
    const deleteProductsSql = `DELETE FROM products;`
    await conn.query(deleteProductsSql)
    conn.release()
  })
  describe('create method tests', () => {
    // test method is defined
    it('should have create method defined', () => {
      expect(productModel.create).toBeDefined()
    })
    // happy scenarios
    it('happy create() should return created product', async () => {
      const product = {
        name: 'testcreate',
        price: 1000,
      } as Product
      const result: Product = await productModel.create(product)
      expect(result).toBeTruthy
      expect(result.name).toEqual(product.name as string)
    })
    // bad scenarios
  })

  describe('index method tests', () => {
    // test method is defined
    it('should have index method defined', () => {
      expect(productModel.index).toBeDefined()
    })
    // happy scenarios
    it('happy index() should return products array', async () => {
      const result: Product[] = await productModel.index()
      expect(result.length > 0).toBeTrue
    })
    // bad scenarios
  })

  describe('show method tests', () => {
    const product = {
      name: 'testshow',
      price: 55,
    } as Product
    beforeAll(async () => {
      const createdProduct:Product = await productModel.create(product)
      product.id = createdProduct.id as string
    })
    // test method is defined
    it('should have show method defined', () => {
      expect(productModel.show).toBeDefined()
    })
    // happy scenarios
    it('happy show() should return requested product data', async () => {
      const result: Product = await productModel.show(product.id as string)
      expect(result.id).toEqual(product.id)
    })
    // bad scenarios
  })

  describe('update method tests', () => {
    const product = {
      name: 'testupdate',
      price: 66,
    } as Product
    const updateProductData = {
      name: 'updated',
      price: 77,
    } as Product
    beforeAll(async () => {
      const createdProduct = await productModel.create(product)
      updateProductData.id = createdProduct.id
    })
    // test method is defined
    it('should have update method defined', () => {
      expect(productModel.update).toBeDefined()
    })
    // happy scenarios
    it('happy update() should return updated product data', async () => {
      const result: Product = await productModel.update(updateProductData)
      expect(result.id).toEqual(updateProductData.id)
      expect(result.name).toEqual(updateProductData.name)
      expect(result.price).toEqual(updateProductData.price)
    })
    // bad scenarios
  })

  // delete
  describe('delete method tests', () => {
    const product = {
      name: 'testdelete',
      price: 56,
    } as Product
    beforeAll(async () => {
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id
    })
    // test method is defined
    it('should have delete method defined', () => {
      expect(productModel.delete).toBeDefined()
    })
    // happy scenarios
    it('happy delete() should return deleted product', async () => {
      const result: Product = await productModel.delete(product.id as string)
      expect(result.id).toEqual(product.id)
    })

    // bad scenarios
    it('should throw error when equesting deleted user', async () => {
      const result: Product = await productModel.show(product.id as string)
      expect(result).toThrow
    })
  })

  // TODO: test bad scenarios
})

