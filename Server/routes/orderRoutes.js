const express = require('express')
const router = express.Router()


const orderController = require('../controller/orderController')


router.get('/orders/get-incomplete-orders',orderController.getOrders)

router.get('/orders/get-orders',orderController.viewOrders)

router.put('/orders/complete-order',orderController.completeOrder)

router.post('/orders/add-order',orderController.makeOrder)

router.put('/orders/cancel-order',orderController.cancelOrder)


module.exports=router;

