import { Sequelize, STRING, INTEGER, FLOAT, BOOLEAN } from 'sequelize'
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
      },
    image: {
        type: STRING,
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

const Cart = seq.define('cart', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      }
})

const User = seq.define('user', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      isActivated: {
        type: BOOLEAN,
        defaultValue: false,
      }
})

const Token = seq.define('token', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      token: {
        type: STRING,
        allowNull: false
      }
})

const Cart_Product = seq.define('Cart_Product', {
      productAmount: {
        type: INTEGER,
        defaultValue: 1
      }
})

Category.hasMany(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
User.hasOne(Token, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Product.belongsToMany(Cart, { through: Cart_Product })
Cart.belongsToMany(Product, { through: Cart_Product })
Cart.hasOne(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export { Product, Category, User, Token, Cart }
