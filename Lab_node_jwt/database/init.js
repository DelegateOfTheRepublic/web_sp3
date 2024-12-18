import fs from 'fs'
import { hashSync, genSaltSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import randomEmail from 'random-email'
import _ from 'lodash'
import { seq } from './db.js'

import { User, Cart, Product, Category, Token } from './models.js'
import { data } from '../secretInfo.js'


async function init() {
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads')
    }

    let modelRecords = []

    for (let modelName of _.keys(seq.models)) {
        modelRecords.push(Boolean((await seq.model(modelName).findAll()).length))
    }

    if (_.sum(modelRecords) === modelRecords.length) {
        console.log('В базе данных есть записи')
        return
    }

    const categories = [
        {
            "name": "Ноутбуки",
        },
        {
            "name": "Смартфоны",
        },
        {
            "name": "Мониторы",
        },
        {
            "name": "Планшеты",
        },
        {
            "name": "Наушники",
        }
    ]
    const products = [
        {
            manufacturer: 'Asus',
            model: 'ASUS Vivobook Go 15 E1504FA-BQ656',
            weight: 1.63,
            price: 38.999,
            image: "https://c.dns-shop.ru/thumb/st4/fit/500/500/ca1b5bf41ef787871e23005ead885853/3f5d92429ce60f4ce11a8d47a9f314d9fabd30a270e6556ca321b51d1690218f.jpg",
        },
        {
            manufacturer: 'Samsung',
            model: 'Samsung Galaxy S24',
            weight: 0.167,
            price: 74.999,
            image: "https://c.dns-shop.ru/thumb/st4/fit/500/500/3f8c86981d4b5c94f499551923f62354/2c084e42f63f4d9dadcb32a1c197f1557e309a09d0b226478f1eb3f73510454a.jpg",
        },
        {
            manufacturer: 'Samsung',
            model: 'Samsung Odyssey Neo G7 S32BG752NI',
            weight: 8.6,
            price: 79.999,
            image: "https://c.dns-shop.ru/thumb/st4/fit/500/500/f781fba3d28ce30694e75652bd9f2b64/185bae9c49c31e9cb4e54c5dc81dc17c5119fb39d898a1e655d6206d0f9e41ba.jpg",
        },
        {
            manufacturer: 'Xiaomi',
            model: 'Xiaomi Pad 6 Wi-Fi',
            weight: 0.49,
            price: 40.999,
            image: "https://c.dns-shop.ru/thumb/st4/fit/500/500/9bde8229a1a576bd40db9379f1cb2794/d11104bdfbcc559d7d38a4db7c33af47d471899b92685203be4379facceaf9d7.jpg",
        },
        {
            manufacturer: 'JBL',
            model: 'JBL Tune Buds',
            weight: 0.528,
            price: 6.799,
            image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b270c1d68a6dc6cea4e1530b029e834c/8b03e12826e927ea8df2dcb124b6b9895a3cefc7981fdc17878de9e7fa7e1ab5.jpg",
        }
    ]

    await Category.bulkCreate(categories).then(async (res) => {
        for (let i = 0; i < products.length; i++) {
            const newProduct = await Product.create(products[i])
            newProduct.categoryId = res[i].id
            let date = new Date()
            const response = await fetch(products[i].image)
            const buffer = await response.arrayBuffer()
            let fileName = `${products[i].model}_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}.jpg`
            fs.writeFile(`${process.cwd()}\\uploads\\${fileName}`, new Uint8Array(buffer), () => {
                console.log('Finishing downloading!')
            })
            newProduct.image = `/uploads/${fileName}`
            await newProduct.save()
        }
    })

    for (let userId = 1; userId <= 5; userId++) {
        const newUser = await User.create({
            email: randomEmail({ domain: 'mail.ru' }),
            password: hashSync('12345', genSaltSync())
        })
        newUser.isActivated = true
        await newUser.save()

        const token = jwt.sign({ email: newUser.email }, data.SECRET_KEY, { expiresIn: '24h' })
        await Token.create({
            userId,
            token
        })

        const productsCount = _.random(1, 8, false)
        const cart = await Cart.create({ userId })
        newUser.cartId = cart.id
        await newUser.save()

        for (let i = 0; i < productsCount; i++) {
            const product = await Product.findByPk(_.random(1, products.length, false))
            await cart.addProduct(product, { through: { productAmount: _.random(1, 5, false) } })
        }
    }
}

export default init
