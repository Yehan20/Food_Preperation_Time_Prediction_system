const db = require('../model/db');

const viewMeals =(req,res)=>{
    let query= "SELECT * FROM food_item";
    db.query(query,(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
           }
    })
}

const FilterMeals =(req,res)=>{
    const foodCategory=req.body.foodCategory
    let query= "SELECT * FROM food_item where  category=?";
    db.query(query,foodCategory,(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
           }
    })
}


const viewMeal=(req,res)=>{
    let id=req.params.id;

    let query= "SELECT * FROM food_item where id=?";
    db.query(query,id,(error,result)=>{
        res.send(result)
    })
}

const viewOrders = (req,res)=>{
    let name = req.params.userName;
    db.query("SELECT * FROM orders where username=? and status='ordered'",[name],(error,result)=>{
        if(!error){
            res.send(result)
        }
        console.log(error)
    })
}

const addMeal = (req,res)=>{
       
    const foodName=req.body.foodName
    const foodCategory=req.body.foodCategory
    const foodPrice=req.body.foodPrice
    const foodDesc=req.body.foodDesc
    const vegNonVeg=req.body.veg


    let imgsrc = '/uploads/' + req.body.fileName
  
    
    let query="INSERT INTO food_item(name,category,price,description,src,veg) VALUES (?,?,?,?,?,?)";
    db.query(query,[foodName,foodCategory,foodPrice,foodDesc,imgsrc,vegNonVeg],(err,result)=>{
       res.send(result)
       if(err){
        console.log(err)
       }
    })
    
}
module.exports={
    viewMeals,viewMeal,addMeal,FilterMeals,viewOrders
}