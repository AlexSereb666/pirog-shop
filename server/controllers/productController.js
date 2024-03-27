const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, ProductType} = require('../models/models')
const ApiError = require('../error/ApiError')

class productController {
    // получить один продукт //
    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id},
            include: [{model: ProductInfo, as: 'info'}]
        })
        return res.json(product)
    }

    // получить все продукты //
    async getAll(req, res) {
        let {ProductTypeId, limit, page} = req.query
        page = page || 1 // количество страниц
        limit = limit || 8 // количество продуктов на 1 странице
        let offset = page * limit - limit
        let products;
        if (!ProductTypeId) {
            products = await Product.findAndCountAll({limit, offset})
        } else if (ProductTypeId) {
            products = await Product.findAndCountAll({where: {ProductTypeId}, limit, offset})
        } 
        return res.json(products)
    }

    async getAllStandart(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                    { model: ProductInfo, as: 'info' },
                    { model: ProductType, as: 'Product_type' }
                ]
            });
            return res.json(products);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // добавить продукт //
    async postProduct(req, res) {
        try {
            let {name, price, ProductTypeId, info} = req.body
            const {img} = req.files

            let fileName = uuid.v4() + ".jpg" 
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, ProductTypeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                });
            }
  
            return res.json(product)
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // удалить продукт //
    async kick(req, res, next) {
        try {
            const {id} = req.params;
    
            // Проверяем, существует ли продукт с указанным ID //
            const product = await Product.findOne({ where: { id } });
            if (!product) {
                return next(ApiError.badRequest('Продукт не найден'));
            }
    
            // Удаляем информацию о продукте //
            await ProductInfo.destroy({ where: { productId: id } });
    
            // Удаляем сам продукт //
            await Product.destroy({ where: { id } });
    
            return res.json({ message: 'Продукт успешно удален' });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new productController()
