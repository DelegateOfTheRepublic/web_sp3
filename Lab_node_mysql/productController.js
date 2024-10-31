import { Product, Category } from "./models.js";


class ProductController {
    async getProducts(req, res) {
        const products = await Product.findAll()
        res.status(200).json(products)
    }

    async getProduct(req, res) {
        const product = await Product.findOne({ where: { id: req.params.id } })
        return res.status(200).json(product)
    }

    async create(req, res) {
        const newProduct = {
            categoryId: req.body.categoryId,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            weight: req.body.weight,
            price: req.body.price
        }

        const product = await Product.create(newProduct)
        return res.status(201).json(product)
    }

    async update(req, res) {
        await Product.update({
            categoryId: req.body.categoryId,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            weight: req.body.weight,
            price: req.body.price
        },
        {
            where: {
                id: req.params.id
            }
        })

        const product = await Product.findByPk(req.params.id)

        return res.status(200).json(product)
    }

    async deleteProduct(req, res) {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json('The product has been successfully deleted!')
    }
}

export default new ProductController()
