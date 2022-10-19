const express = require('express')
const mysql = require('mysql');

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"resturant"
})

module.exports=db;