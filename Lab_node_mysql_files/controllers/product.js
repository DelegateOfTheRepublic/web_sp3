import path from "path"
import _ from "lodash"
import { Product } from "../database/models.js";


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

        const { image } = req.files
        let imageName = `${newProduct.model}.jpg`
        const __dirname__ = path.resolve()

        image.mv(path.resolve(__dirname__, 'uploads', imageName))

        newProduct["image"] = `/uploads/${imageName}`

        const product = await Product.create(newProduct)
        return res.status(201).json(product)
    }

    async update(req, res) {
        const oldProduct = await Product.findByPk(req.params.id)

        const image = req.files?.["image"] || undefined
        let imageName = oldProduct.image
        const __dirname__ = path.resolve()

        image?.mv(path.resolve(__dirname__, 'uploads', imageName))

        await Product.update({
            categoryId: req.body.categoryId,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            weight: req.body.weight,
            price: req.body.price,
            image: (!_.isUndefined(image))? `/uploads/${imageName}` : undefined
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
