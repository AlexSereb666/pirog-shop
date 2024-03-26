const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.get('/getOne/:id', productController.getOne)
router.get('/', productController.getAll)
router.post('/', productController.postProduct)
router.delete('/delete/:id', productController.kick)
router.get('/standart', productController.getAllStandart)

module.exports = router
