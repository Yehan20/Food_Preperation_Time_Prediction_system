const express = require('express')

const router = express.Router()


const authController = require('../controller/authController')

router.post('/customer-login',authController.customerLogin)

router.post('/customer-sign-in',authController.customerSignIn)



module.exports=router;