import express from 'express'
import fileUpload from 'express-fileupload'
import { router } from './routers/index.js'
import { seq } from './database/db.js'
import path from "path"
import init from './database/init.js'

const app = express()
const PORT = 8000

app.use(express.json())
app.use('/uploads', express.static(path.join(`${process.cwd()}/uploads`)))
app.use(fileUpload({}))
app.use('/api', router)

seq
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

seq.sync({ alter: true }).then(async (result) => {
  console.log('test succesful')
  await init()
})

app.listen(PORT, function () {
  console.log('Server started in PORT :', PORT)
})
