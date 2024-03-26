const Router = require('express')
const router = new Router()
const userController = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)
router.post('/change-password', userController.changePassword);
router.post('/change-profile', userController.changeProfile);
router.get('/getOne/:id', userController.getUser)
router.get('/getAll', userController.getUsers)
router.put('/editStatus/:id', userController.changeRole)

module.exports = router
