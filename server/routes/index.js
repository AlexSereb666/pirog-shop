const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')
const feedbackRouter = require('./feedbackRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/type', typeRouter)
router.use('/feedback', feedbackRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)

module.exports = router
