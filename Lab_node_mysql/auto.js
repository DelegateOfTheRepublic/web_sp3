import _ from "lodash"
import { Product, Category } from "./models.js"


let product = await Product.findOne()
let category = await Category.findOne()

const baseURL = 'http://127.0.0.1:8000'
const categoriesAPI = `${baseURL}/api/categories`
const productsAPI = `${baseURL}/api/products`

let products_ids = []
let categories_ids = []

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
        },
        {
            manufacturer: 'Samsung',
            model: 'Samsung Galaxy S24',
            weight: 0.167,
            price: 74.999,
        },
        {
            manufacturer: 'Samsung',
            model: 'Samsung Odyssey Neo G7 S32BG752NI',
            weight: 8.6,
            price: 79.999,
        },
        {
            manufacturer: 'Xiaomi',
            model: 'Xiaomi Pad 6 Wi-Fi',
            weight: 0.49,
            price: 40.999,
        },
        {
            manufacturer: 'JBL',
            model: 'JBL Tune Buds',
            weight: 0.528,
            price: 6.799,
        }
    ]

    await Category.bulkCreate(categories).then(async (res) => {
        for (let i = 0; i < products.length; i++) {
            const newProduct = await Product.create(products[i])
            newProduct.categoryId = res[i].id
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

randomCategoryId = _.sample(categories_ids)
const newProduct= {
    "categoryId": randomCategoryId,
    "manufacturer": "ManufacturerA",
    "model": "ManufacturerA ModelB",
    "weight": 12.2,
    "price": 80.564
}
await fetch(new Request(`${productsAPI}/`, {
    "method": "POST",
    "body": JSON.stringify(newProduct),
    "headers": {
        "content-type": "application/json"
    }
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

