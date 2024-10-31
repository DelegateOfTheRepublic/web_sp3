import express from 'express'
import { router } from './router.js'
import { seq } from './db.js'
const app = express()
const PORT = 8000

app.use(express.json())
app.use('/api', router)

seq
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

seq.sync({ alter: true }).then((result) => {
  console.log('test succesful')
})

app.listen(PORT, function () {
  console.log('Server started in PORT :', PORT)
})
