// requiring the packages
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer')
// Make our express aplication
const  app = express();

// Listen for Http requests
app.listen(3001,()=>{
    console.log("App running on port 3001");
})


// Config our connection
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"resturant"
})

// Middle were to run in beetween our request
app.use(express.json()) 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))


const storage = multer.diskStorage({
    destination:'../Client/public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
// 

const upload = multer({ storage: storage })



// Configuring our routes
app.post('/api/insert', upload.single('file'),(req,res)=>{
       
    const foodName=req.body.foodName
    const foodCategory=req.body.foodCategory
    const foodPrice=req.body.foodPrice
    const foodDesc=req.body.foodDesc
    const vegNonVeg=req.body.veg

    // console.log(req.body)

    var imgsrc = '/uploads/' + req.body.fileName
    console.log(imgsrc);
    
    let query="INSERT INTO food_item(name,category,price,description,src,veg) VALUES (?,?,?,?,?,?)";
    db.query(query,[foodName,foodCategory,foodPrice,foodDesc,imgsrc,vegNonVeg],(err,result)=>{
       res.send(result)
       if(err){
        console.log(err)
       }
    })
    
})

app.get('/api/get',(req,res)=>{
    let query= "SELECT * FROM food_item";
    db.query(query,(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
           }
    })
})


app.get('/api/get-one/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let query= "SELECT * FROM food_item where id=?";
    db.query(query,id,(error,result)=>{
        res.send(result)
    })
})

app.get('/api/get-incomplete-orders',(req,res)=>{
    let query="SELECT COUNT(status) as count FROM orders WHERE orders.status='ordered'";
    db.query(query,(error,result)=>{
        // console.log(result[0].count);
        let amount = result[0].count.toString()
        res.send(amount)
    
    })
})

app.get('/api/get-orders',(req,res)=>{
    let query= "SELECT * FROM orders WHERE status='Ordered'";
    db.query(query,(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
    })
})

app.put('/api/complete-order',(req,res)=>{
    id= req.body.order.order_id
    console.log('id is',id);
   
    let query = "UPDATE orders SET status='completed' where order_id=?";
    db.query(query,[id],(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
    })
})

app.post('/api/add-order',(req,res)=>{

    // Fromt the form 
    const foodName=req.body.foodName;
    const foodAmt=req.body.foodAmt;
    const foodSize = req.body.size;
    const exp=req.body.exp

    let query="INSERT INTO orders(name,size,amount,status,chef) VALUES (?,?,?,?,?)";
    db.query(query,[foodName,foodSize,foodAmt,'ordered',exp],(err,result)=>{
        res.send(result)
        if(err){
         console.log(err)
        }
    })
})









