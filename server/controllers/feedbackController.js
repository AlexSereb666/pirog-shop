const {Feedback, User} = require('../models/models');

class feedback {

    // создание жалобы //
    async create(req, res) {
        const {userId, title, message} = req.body
        let date = new Date();

        const _feedback = await Feedback.create({
            userId,
            title,
            message,
            date,
        });

        return res.json(_feedback)
    }

    // получение всех жалоб //
    async getAll(req, res) {
        try {
            const _feedbacks = await Feedback.findAll({
                include: {model: User, attributes: ['id', 'login', 'email']}
            });
            return res.json(_feedbacks);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async updateStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const feedback = await Feedback.findByPk(id);
            if (!feedback) {
                return res.status(404).json({ message: "Отзыв не найден" });
            }

            await feedback.update({ status });
            return res.json({ message: "Статус отзыва успешно обновлен" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteById(req, res) {
        const { id } = req.params;

        try {
            const feedback = await Feedback.findByPk(id);
            if (!feedback) {
                return res.status(404).json({ message: "Отзыв не найден" });
            }

            await feedback.destroy();
            return res.json({ message: "Отзыв успешно удален" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new feedback()
