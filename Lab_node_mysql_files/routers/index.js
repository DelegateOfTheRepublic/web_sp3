import { Router } from "express";
import { categoryRouter } from "./category.js";
import { productRouter } from "./product.js"


export const router = new Router()

router.use('/categories', categoryRouter)
router.use('/products', productRouter)
