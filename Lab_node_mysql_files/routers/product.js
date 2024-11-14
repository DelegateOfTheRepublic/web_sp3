import { Router } from 'express'
import ProductController from '../controllers/product.js'


export const productRouter = new Router()

productRouter.get('/', ProductController.getProducts)
productRouter.get('/:id', ProductController.getProduct)
productRouter.post('/', ProductController.create)
productRouter.put('/:id', ProductController.update)
productRouter.delete('/:id', ProductController.deleteProduct)
