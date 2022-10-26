'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

const DATABASE_URL= process.env. DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;
const options = NODE_ENV === 'production' ? { connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } } : { connectionString: DATABASE_URL };
const client = new pg.Client(options);

client.on('error', err => { throw err; });


const app = express();
const PORT = process.env.PORT || 3005;



app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
client.connect().then(()=>app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)));

app.get("/",mytest)
app.get("/get",getData)


function mytest(req,res){
    // const bookId = req.params.id;
    // console.log('id ',bookId)
    const sql = 'INSERT INTO users (email,password,firstName) VALUES ($1,$2,$3) RETURNING *;';
    const arr =['test@gmail.com',' 0000','user name']

    client.query(sql,arr)
      .then(data=>{
        console.log('id after',data.rows)
        res.json(data.rows);
      });
  }

  function getData(req,res){
    // const bookId = req.params.id;
    // console.log('id ',bookId)
    const sql = 'SELECT * FROM users'

    client.query(sql)
      .then(data=>{
        console.log('SELECT * FROM users',data)
        res.json(data.rows);
      });
}