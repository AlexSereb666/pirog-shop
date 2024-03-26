const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', basketController.addToBasket)
router.get('/:id', basketController.getBasket)
router.delete('/:basketProductId', basketController.removeFromBasket)

module.exports = router
