
const db = require('../model/db');

const  customerLogin = (req, res) => {
    const username = req.body.userName;
    const password = req.body.pwd;

    // validating username


    let query = "SELECT * FROM customer WHERE username=? and password=? ";
    db.query(query,[username, password], (err, result) => {

        if (err) {
            res.send(err)
        }

        if (result) {
            res.send(result)
        }
        else {
            res.send({ message: 'no user fouund' })
        }
    })
}

const  sameName =  (username) => {

    // this is an asyncronois function there fore we return a promise since we wanna to access it in the other method
    return new Promise((resolve,reject)=>{
        let query = "SELECT * FROM  customer where username=?";
        db.query(query, [username], (err, result) => {
           console.log(result)
            if (err) {
                reject('Some thing wen wrong')
            }
            else{
            
                resolve(result.length)
            }
        })  
    })
}


const customerSignIn = async(req, res) => {
    const username = req.body.userName;
    const password = req.body.pwd;

    const isRepeated=await sameName(username)
    console.log(isRepeated)
    if(isRepeated<1){
        let query = "INSERT INTO  customer (username,password) values(?,?)";
        db.query(query, [username, password], (err, result) => {
            res.send({message:'',status:true})
            if (err) {
                console.log(err)
            }
        })
    }
    else{
        console.log('same user id')
        res.send({message:'Login is used',status:false})
    }
}


module.exports = {
    customerLogin, customerSignIn
}    