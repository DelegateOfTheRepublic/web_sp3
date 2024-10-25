import _ from "lodash"


const baseURL = 'http://127.0.0.1:8000'
let goods_id = []

await fetch(new Request(`${baseURL}/goods/`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log('Список всех товаров')
    for (let good of data) {
        goods_id.push(good["id"])
        console.log(good)
    }
})

let randomGoodId = _.sample(goods_id)
fetch(new Request(`${baseURL}/goods/${randomGoodId}`, {
    "method": "GET"
})).then(res => res.json()).then(data => {
    console.log(`\nТовар с ID: ${randomGoodId}\n${JSON.stringify(data, null, 4)}\n`)
})

const newGood = {
    "category": "CategoryA",
    "manufacturer": "ManufacturerA",
    "model": "ManufacturerA ModelB",
    "weight": 12.2,
    "price": 80.564
}
fetch(new Request(`${baseURL}/goods/`, {
    "method": "POST",
    "body": JSON.stringify(newGood),
    "headers": {
        "content-type": "application/json"
    }
})).then(res => res.json()).then(data => console.log(`Новый товар\n${JSON.stringify(data, null, 4)}`))
