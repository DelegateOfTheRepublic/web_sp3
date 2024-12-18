import { Router } from "express";
import { categoryRouter } from "./category.js";
import { productRouter } from "./product.js"
import { cartRouter } from './cart.js'
import { authRouter } from "./auth.js";
import { verifyToken } from "../middleware/tokenValidation.js";


export const router = new Router()

router.use('/categories', verifyToken, categoryRouter)
router.use('/products', verifyToken, productRouter)
router.use('/cart', verifyToken, cartRouter)
router.use('/auth', authRouter)
