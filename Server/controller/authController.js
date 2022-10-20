const e = require('express');
const db = require('../model/db');

const customerLogin = (req, res) => {
    const username = req.body.userName;
    const password = req.body.pwd;



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

const sameName = (req, res) => {
    const username = req.body.userName;
  

    let query = "SELECT * FROM  customer where username=?";
    db.query(query, username, (err, result) => {
        res.send(result)
        if (err) {
            console.log(err)
        }
    })
}


const customerSignIn = (req, res) => {
    const username = req.body.userName;
    const password = req.body.pwd;

    let query = "INSERT INTO  customer (username,password) values(?,?)";
    db.query(query, [username, password], (err, result) => {
        res.send(result)
        if (err) {
            console.log(err)
        }
    })
}


module.exports = {
    customerLogin, customerSignIn,sameName
}