const { Order, Product } = require('../models/models');

class orderProduct {
    // создать заказ //
    async addOrder(req, res) {
        try {
            const {userId, productId, date, status} = req.body
            const order = await Order.create({userId, productId, date, status})

            return res.json(order)
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // изменить статус заказа //
    async updateStatusOrder(req, res) {
        try {
            const { id } = req.params;
            const { idUser, status } = req.body;

            let order = await Order.findOne({ where: { id } });
            if (!order) {
                return res.status(404).json({ message: `Заказ не найден` });
            }

            order.status = status;
            await order.save();
            
            return res.json(order);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // удалить заказа //
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;

            // Найти заказ по id
            const order = await Order.findOne({ where: { id } });
            if (!order) {
                return res.status(404).json({ message: `Заказ не найден` });
            }

            // Удалить все продукты из таблицы OrderProduct, которые принадлежат этому заказу
            await Order.destroy({ where: { orderId: id } });

            // Удалить сам заказ
            await Order.destroy({ where: { id } });

            return res.json({ message: 'Заказ успешно удален' });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // добавить продукт в заказ //
    async addProductToOrder(req, res) {
        try {
            const {orderId, productId} = req.body
            const orderProduct = await Order.create({orderId, productId})

            return res.json(orderProduct)
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // удалить продукт из заказа //
    async deleteProductToOrder(req, res) {
        try {
            const {id} = req.params;

            const orderProduct = await Order.findOne({ where: { id } });
            if (!orderProduct) {
                return res.status(404).json({ message: `Продукт в заказе не найден` });
            }
    
            await Order.destroy({ where: { id } });
    
            return res.json({ message: 'Продукт из заказа успешно удален' });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // получить все заказы и продукты в них //
    async getOrdersAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: {
                    model: OrderProduct,
                    include: Product
                }
            });
            return res.json(orders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // получить заказы одного конкретного пользователя по его id //
    async getOrderOne(req, res) {
        try {
            const { userId } = req.params;
            const orders = await Order.findAll({
                where: { userId },
                include: {
                    model: OrderProduct,
                    include: Product
                }
            });

            return res.json(orders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // получить заказ по его id и спиок продуктов //
    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findOne({
                where: { id },
                include: {
                    model: OrderProduct,
                    include: Product
                }
            });
            if (!order) {
                return res.status(404).json({ message: `Заказ не найден` });
            }
            return res.json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getOrdersByUserId(req, res) {
        try {
            const { userId } = req.params;
    
            // Найти все заказы пользователя
            const orders = await Order.findAll({
                where: { userId },
                include: {
                    model: Product // Подключаем модель Product, чтобы получить информацию о продуктах
                }
            });
    
            return res.json(orders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new orderProduct()
