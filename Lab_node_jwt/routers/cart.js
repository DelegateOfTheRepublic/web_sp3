import { Router } from 'express'
import CartController from '../controllers/cart.js'


export const cartRouter = new Router()

cartRouter.get('/', CartController.getCart)
cartRouter.put('/:id', CartController.update)
cartRouter.delete('/:id', CartController.delete)
cartRouter.put('/:id', CartController.updateAmount)
