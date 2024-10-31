import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { connectionConfig } from './dbConfig.js'

await mysql.createConnection({
  user: connectionConfig.username,
  password: connectionConfig.password
}).then(connection => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`)
})

const seq = new Sequelize('shop', 'root', '', {
  dialect: 'mysql',
  host: connectionConfig.host,
  port: connectionConfig.port,
})


export { seq }