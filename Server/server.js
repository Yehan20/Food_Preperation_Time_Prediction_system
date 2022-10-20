// requiring the packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Make our express aplication
const  app = express();

const port = process.env.PORT || 3001;

const orderRoutes= require('./routes/orderRoutes');
const mealRoutes= require('./routes/mealRoutes');
const authRoutes = require('./routes/authRoutes')

// Listen for Http requests
app.listen(port,()=>{
    console.log("App running on port 3001");
})



// Middle were to run in beetween our request
app.use(express.json()) 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))


// Configuring our routes
app.use(orderRoutes)

app.use(mealRoutes)

app.use(authRoutes)

module.exports=app;








