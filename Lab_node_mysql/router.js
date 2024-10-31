import { Router } from 'express'
import ProductController from './productController.js'
import CategoryController from './categoryController.js'


export const router = new Router()

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProduct)
router.post('/products', ProductController.create)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.deleteProduct)

router.get('/categories', CategoryController.getCategories)
router.get('/categories/:id', CategoryController.getCategory)
router.post('/categories', CategoryController.create)
router.put('/categories/:id', CategoryController.update)
router.delete('/categories/:id', CategoryController.deleteCategory)
