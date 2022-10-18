const express = require('express')
const app = express(); // creates an express application
const mysql= require('mysql')
const bodyParser = require('body-parser');
const cors = require('cors');


// Config the data base
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"cruddb"
})

app.use(express.json()) // get the information and convert into a json file
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))


app.post('/api/insert',(req,res)=>{

    // Fromt the form 
    const movieName=req.body.movieName;
    const movieReview=req.body.movieReview;


    let query="INSERT INTO moviereview(movieName, review) VALUES (?,?)";
    db.query(query,[movieName,movieReview],(err,result)=>{
       res.send(result)
    })
})

app.get('/api/get',(req,res)=>{
    let query= "SELECT * FROM moviereview";
    db.query(query,(error,result)=>{
        res.send(result)
    })
})

app.delete('/api/delete/:id',(req,res)=>{
    let movieId=req.params.id;

    let query="DELETE FROM moviereview where id=?"


    db.query(query,movieId,(result,error)=>{
        res.send(result)
    })
})

app.put('/api/update',(req,res)=>{
    let moviId= req.body.id;
    let moviname= req.body.movieName;
    console.log(req.body)
    let query="UPDATE moviereview set moviename=? where id=?"

    db.query(query,[moviname,moviId],(result,error)=>{
        console.log("result",result)
        res.send(result)
    })
})
app.listen(3001,()=>{
    console.log("App running on port 3001");
})


// If you use this route give this messag
// app.get('/',(req,res)=>{
//     // create sql query
//     let query="INSERT INTO moviereview(movieName, review) VALUES ('Harry Potter 1','good movie');";
//     db.query(query,(error,result)=>{
//         if(result){
//             res.send("Hello From Uzbekistan")  
//         }
//         else{
//             console.log("cannot donnect to db");
//         }
      
//     })

// })