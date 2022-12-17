const express = require('express')
const mysql = require('mysql');

const db=mysql.createPool({
    host:"db4free.net",
    user:"yehan123",
    password:"$firedog123",
    database:"food_labs_db"
})

module.exports=db;