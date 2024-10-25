import express from 'express'
import _ from 'lodash'


const app = express()
const PORT = 8000

let goods = [
    {
        id: 1,
        category: 'Ноутбуки',
        manufacturer: 'Asus',
        model: 'ASUS Vivobook Go 15 E1504FA-BQ656',
        weight: 1.63,
        price: 38.999,
    },
    {
        id: 2,
        category: 'Смартфоны',
        manufacturer: 'Samsung',
        model: 'Samsung Galaxy S24',
        weight: 0.167,
        price: 74.999,
    },
    {
        id: 3,
        category: 'Мониторы',
        manufacturer: 'Samsung',
        model: 'Samsung Odyssey Neo G7 S32BG752NI',
        weight: 8.6,
        price: 79.999,
    },
    {
        id: 4,
        category: 'Планшеты',
        manufacturer: 'Xiaomi',
        model: 'Xiaomi Pad 6 Wi-Fi',
        weight: 0.49,
        price: 40.999,
    },
    {
        id: 5,
        category: 'Наушники',
        manufacturer: 'JBL',
        model: 'JBL Tune Buds',
        weight: 0.528,
        price: 6.799,
    }
]


app.use(express.json())

app.get('/goods/', (req, res) => {
    res.status(200).json(goods)
})

app.get('/goods/:id', (req, res) => {
    const good = goods.find(good => good.id == req.params.id)

    if (_.isUndefined(good)) {
        res.status(404).json('Good does not exist')
    }

    res.status(200).json(good)
})

app.post('/goods/', (req, res) => {
    const newGood = {
        id: _.last(goods).id + 1,
        category: req.body.category,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        weight: req.body.weight,
        price: req.body.price
    }

    goods.push(newGood)

    res.json(newGood)
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
