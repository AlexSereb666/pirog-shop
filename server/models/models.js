const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING},
})

const Basket = sequelize.define('basket', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Product = sequelize.define('product', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},
    price: {type:DataTypes.FLOAT},
    rating: {type:DataTypes.INTEGER, defaultValue: 0},
    img: {type:DataTypes.STRING},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type:DataTypes.STRING},
    description: {type:DataTypes.STRING},
})

const ProductType = sequelize.define('Product_type', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},
})

const Rating = sequelize.define('rating', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type:DataTypes.INTEGER}
})

const Feedback = sequelize.define('Feedback', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    message: {type:DataTypes.STRING},
    date: {type:DataTypes.DATE}
})

const Order = sequelize.define('order', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type:DataTypes.DATE},
    status: {type:DataTypes.STRING}
})


// связи //
User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Feedback)
Feedback.belongsTo(User)

Product.hasMany(Order)
Order.belongsTo(Product)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    ProductInfo,
    ProductType,
    Rating,
    Feedback,
    Order,
}
