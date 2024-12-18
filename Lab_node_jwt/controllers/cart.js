import { Cart, Product, User } from "../database/models.js"

class CartController {
    async getCart(req, res) {
        const cartId = await (await User.findOne({ email: req.user.email })).dataValues.cartId
        let cart = (await Cart.findOne({ where: { id: cartId }, include: Product })).toJSON()

        if (cart) {
            let totalCost = 0.0

            for (let product of cart.products) {
                totalCost += product.price * product.Cart_Product.productAmount
            }

            cart['totalCost'] = totalCost

            return res.status(200).json({ 'cart': cart })
        }

        return res.status(404).json({ 'cart': null })
    }

    async update(req, res) {
        const { productId, amount } = req.body
        const cart = await Cart.findByPk(req.params.id)

        await cart.addProduct(await Product.findByPk(productId), { through: { amount } })

        return res.status(200).json({ 'cart': cart })
    }

    async updateAmount(req, res) {
        const { productId, amount } = req.body
        const cart = await Cart.findByPk(req.params.id)

        const cartProduct = await cart.Cart_Product.findOne({ where: { productId: productId } })
        cartProduct.productAmount = amount

        await cartProduct.save()

        return res.status(200).json({ 'cart': cart })
    }

    async delete(req, res) {
        const { productId } = req.body
        const cart = await Cart.findByPk(req.params.id)

        await cart.removeProduct(productId)

        return res.status(200).json({ 'cart': cart })
    }
}

export default new CartController()
