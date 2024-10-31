import { Sequelize, STRING, INTEGER, FLOAT } from 'sequelize'
import { seq } from './db.js'


const Product = seq.define('product', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    manufacturer: {
        type: STRING,
        allowNull: false,
      },
    model: {
        type: STRING,
        allowNull: false,
      },
    weight: {
        type: FLOAT,
        allowNull: false,
      },
    price: {
        type: FLOAT,
        allowNull: false,
      }
})

const Category = seq.define('category', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: {
        type: STRING,
        allowNull: false,
    }
})

Category.hasOne(Product, { onDelete: 'CASCADE'})

export { Product, Category }
