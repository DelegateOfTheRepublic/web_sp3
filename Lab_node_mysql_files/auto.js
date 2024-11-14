import _ from "lodash"
import fs from 'fs'
import { Product, Category } from "./database/models.js"


let product = await Product.findOne()
let category = await Category.findOne()

const baseURL = 'http://127.0.0.1:8080'
const categoriesAPI = `${baseURL}/api/categories`
const productsAPI = `${baseURL}/api/products`

let products_ids = []
let categories_ids = []

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
}

if (!product || !category) {
    let categories = [
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

    let products = [
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
}

await fetch(new Request(`${categoriesAPI}`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log('\nСписок всех категорий товаров')
    for (let category of data) {
        categories_ids.push(category["id"])
        console.log(category)
    }
})

let randomCategoryId = _.sample(categories_ids)
await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => console.log(`\nКатегория товара с ID: ${randomCategoryId}\n${JSON.stringify(data, null, 4)}`))

const newCategory = { "name": "New Category Name" }
await fetch(new Request(`${categoriesAPI}`, {
    "method": "POST",
    "body": JSON.stringify(newCategory),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`\nНовая категория товара\n${JSON.stringify(data, null, 4)}`))

randomCategoryId = _.sample(categories_ids)
await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => category = JSON.stringify(data, null, 4))

await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "PUT",
    "body": JSON.stringify({ "name": "New Category Name2" }),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`\nКатегория товара до обновления\n${category}\nКатегория товара после обновления\n${JSON.stringify(data, null, 4)}\n`))

randomCategoryId = _.sample(categories_ids)
categories_ids = []
await fetch(new Request(`${categoriesAPI}/${randomCategoryId}`, {
    "method": "DELETE"
})).then(res => res.json()).then(async (data) => {
    console.log(`ID: ${randomCategoryId} - ${JSON.stringify(data, null, 4)}`)

    await fetch(new Request(`${categoriesAPI}`, {
        "method": "GET"
    })).then(res => res.json()).then(data => {
        for (let category of data) {
            categories_ids.push(category["id"])
            console.log(category)
        }
    })
})

await fetch(new Request(`${productsAPI}/`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log('\nСписок всех товаров')
    for (let product of data) {
        products_ids.push(product["id"])
        console.log(product)
    }
})

let randomProductId = _.sample(products_ids)
await fetch(new Request(`${productsAPI}/${randomProductId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log(`\nТовар с ID: ${randomProductId}\n${JSON.stringify(data, null, 4)}\n`)
})

const res = await fetch("https://c.dns-shop.ru/thumb/st1/fit/500/500/0625bcdb4284baef662d0173e9ff7eac/9b40d8cd4c2fc9e1a262bf7a1be9f7a8be7150a09fc3d9a09fde79ebbb1fe35a.jpg")
const blob = await res.blob()

randomCategoryId = _.sample(categories_ids)
const newProduct= {
    "categoryId": randomCategoryId,
    "manufacturer": "ManufacturerA",
    "model": "ManufacturerA ModelB",
    "weight": 12.2,
    "price": 80.564,
    "image": blob
}
const form = new FormData()

for (let key of Object.keys(newProduct)) {
    form.append(key, newProduct[key])
}

await fetch(new Request(`${productsAPI}/`, {
    "method": "POST",
    "body": form,
})).then(res => res.json()).then(data => console.log(`Новый товар\n${JSON.stringify(data, null, 4)}`))

randomProductId = _.sample(products_ids)
await fetch(new Request(`${productsAPI}/${randomProductId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => { product = JSON.stringify(data, null, 4) })

await fetch(new Request(`${productsAPI}/${randomProductId}`, {
    "method": "PUT",
    "body": JSON.stringify({"weight": _.random(10.0, 100.0, true)}),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`\nТовар до обновления\n${product}\nТовар после обновления\n${JSON.stringify(data, null, 4)}\n`))

randomProductId = _.sample(products_ids)
await fetch(new Request(`${productsAPI}/${randomProductId}`, {
    "method": "DELETE"
})).then(res => res.json()).then(async (data) => {
    console.log(`ID: ${randomProductId} - ${JSON.stringify(data, null, 4)}`)

    await fetch(new Request(`${productsAPI}/`, {
        "method": "GET"
    })).then(res => res.json()).then(data => {
        for (let product of data) {
            console.log(product)
        }
    })
})

