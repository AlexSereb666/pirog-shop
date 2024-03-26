const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, login, email, phone, role) => {
    return jwt.sign({
        id, login, email, phone, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    // регистрация //
    async registration(req, res, next) {
        try {
            const { login, password, email, phone, role, address } = req.body
            if (!login || !email || !phone) {
                return next(ApiError.badRequest('Некорректные параметры ввода!:('))
                //return res.status(404).json({ message: 'Некорректные параметры ввода!:(' })
            }
    
            // проверка, есть ли такой пользователь в БД //
            let candidate = await User.findOne({where: {login}})
            if (candidate) {
                return next(ApiError.badRequest('Данный логин занят'))
                //return res.status(404).json({ message: 'Данный логин занят' })
            }
            candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Данный email занят'))
                //return res.status(404).json({ message: 'Данный email занят' })
            }
            candidate = await User.findOne({where: {phone}})
            if (candidate) {
                return next(ApiError.badRequest('Данный телефон занят'))
                //return res.status(404).json({ message: 'Данный телефон занят' })
            }
    
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({login, password: hashPassword, email, phone, role, address})
            const backet = await Basket.create({userId: user.id})
            const token = generateJwt(user.id, user.login, user.email, user.phone, user.role, user.address);
            return res.json({token})
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    // авторизация //
    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
            //return res.status(500).json({ message: 'Пользователь не найден' })
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неправильный пароль'))
            //return res.status(500).json({ message: 'Неправильный пароль' })
        }
        const token = generateJwt(user.id, user.login, user.email, user.phone, user.role);
        return res.json({token})
    }

    // проверка находится ли пользователь в системе //
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.email, req.user.phone, req.user.role, req.user.address)
        return res.json({token})
    }

    // Смена пароля //
    async changePassword(req, res, next) {
        try {
            const { oldPassword, newPassword, userId } = req.body;

            // Находим пользователя //
            const user = await User.findByPk(userId);

            // Проверяем старый пароль //
            const comparePassword = bcrypt.compareSync(oldPassword, user.password);
            if (!comparePassword) {
                return next(ApiError.internal('Неправильный старый пароль'));
            }

            // Хэшируем новый пароль //
            const hashPassword = await bcrypt.hash(newPassword, 5);

            // Обновляем пароль пользователя //
            await User.update({ password: hashPassword }, { where: { id: userId } });

            return res.json({ message: 'Пароль успешно изменен' });
        } catch (error) {
            next(error);
        }
    }

    // изменение данных аккаунта //
    async changeProfile(req, res, next) {
        try {
            const { newLogin, newEmail, newPhone, userId, address } = req.body;
    
            // Проверяем, существуют ли другие пользователи с такими данными
            const existingLogin = await User.findOne({ where: { login: newLogin, id: { [Op.ne]: userId } } });
            const existingEmail = await User.findOne({ where: { email: newEmail, id: { [Op.ne]: userId } } });
            const existingPhone = await User.findOne({ where: { phone: newPhone, id: { [Op.ne]: userId } } });
    
            if (existingLogin) {
                return next(ApiError.internal('Данный логин занят'));
            }
    
            if (existingEmail) {
                return next(ApiError.internal('Данный email занят'));
            }
    
            if (existingPhone) {
                return next(ApiError.internal('Данный номер телефона занят'));
            }
    
            // Обновляем данные пользователя
            await User.update({ login: newLogin, email: newEmail, phone: newPhone, address }, { where: { id: userId } });
    
            return res.json({ message: 'Данные пользователя успешно изменены' });
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const {id} = req.params;
            const data = await User.findOne({where: {id: id}});
            return res.json(data);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.json(users)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async changeRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            user.role = role;
            await user.save();
            return res.json({ message: 'Роль пользователя успешно изменена' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new userController()
