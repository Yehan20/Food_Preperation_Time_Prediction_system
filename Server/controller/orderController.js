const db = require('../model/db');

const getOrders =(req,res)=>{
    let query="SELECT COUNT(status) as count FROM orders WHERE status='ordered'";
    db.query(query,(error,result)=>{
        // console.log(result[0].count);
        let amount = result[0].count.toString()
        res.send(amount)
    
    })
}

const viewOrders=(req,res)=>{
    let query= "SELECT * FROM orders WHERE status='Ordered'";
    db.query(query,(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
    })
}

const makeOrder=(req,res)=>{

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
}

const completeOrder=(req,res)=>{
    id= req.body.order.order_id

   
    let query = "UPDATE orders SET status='completed' where order_id=?";
    db.query(query,[id],(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
    })
}

module.exports={
    getOrders,viewOrders,makeOrder,completeOrder
}