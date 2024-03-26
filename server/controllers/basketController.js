const {Basket, OrderProduct, Product, BasketProduct} = require('../models/models');
const ApiError = require('../error/ApiError');

class basketController {
    // получить корзину пользователя //
    async getBasket(req, res, next) {
        try {
            const {id} = req.params;
            const basket = await Basket.findOne({where: {userId: id}, include: [BasketProduct]});
            return res.json(basket);
        } catch (e) {
            return res.status(500).json({ error: error.message });
        }
    }

    // добавить продукт в корзину //
    async addToBasket(req, res, next) {
        try {
            const {userId, productId} = req.body;
            const basket = await Basket.findOne({where: {userId: userId}});
            if (!basket) {
                return next(ApiError.badRequest('Корзина пользователя не найдена'));
            }

            await BasketProduct.create({basketId: basket.id, productId: productId});
            return res.json({message: 'Продукт добавлен в корзину'});
        } catch (e) {
            return res.status(500).json({ error: error.message });
        }
    }

    // удалить продукт из корзины //
    async removeFromBasket(req, res, next) {
        try {
            const { userId } = req.body;
            const { basketProductId } = req.params;
    
            const basket = await Basket.findOne({ where: { userId: userId } });
            if (!basket) {
                return next(ApiError.badRequest('Корзина пользователя не найдена'));
            }
    
            const basketProduct = await BasketProduct.findOne({ 
                where: { 
                    id: basketProductId, 
                    basketId: basket.id 
                },
                limit: 1 // Добавляем ограничение на один результат
            });
    
            if (!basketProduct) {
                return next(ApiError.badRequest('Продукт в корзине не найден'));
            }
    
            await basketProduct.destroy();
            return res.json({ message: 'Продукт удален из корзины' });
        } catch (e) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new basketController();
