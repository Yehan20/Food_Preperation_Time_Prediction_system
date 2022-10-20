const express = require('express')
const multer = require('multer')
const router = express.Router()


const mealController = require('../controller/mealController')


const storage = multer.diskStorage({
    destination:'../Client/public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
// 

const upload = multer({ storage: storage })

router.post('/meals/add', upload.single('file'),mealController.addMeal)

router.get('/meals',mealController.viewMeals)

router.get('/meals/filter',mealController.FilterMeals)

router.get('/meals/meal/:id',mealController.viewMeal)

module.exports=router;