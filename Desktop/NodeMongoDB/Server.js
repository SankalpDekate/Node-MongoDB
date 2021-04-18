var express = require('express');
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/'
var app=express();
app.use(bodyParser.json())
var students=['Sankalp','Sankalp1','Sankalp2'];
var teachers=['Teacher','Teacher1','Teacher2'];

app.get('/students',(req,res)=>{
    MongoClient.connect(url,(err,database)=>{
        if(err){
            throw err
        }
        var mydb = database.db('mydb');
        mydb.collection('students').find({}).toArray((err,rs)=>{
            if(err){
                throw err
            }
            database.close()
            res.send(rs)
        })
    })
})

app.get('/students/:id',(req,res)=>{
    var studentid = req.params.id
    console.log(studentid)
    MongoClient.connect(url,(err,database)=>{
        if(err){
            throw err
        }
        var mydb = database.db('mydb');
        mydb.collection('students').find({FirstName:studentid}).toArray((err,rs)=>{
            if(err){
                throw err
            }
            console.log(rs)
            database.close()
            res.send(rs)
        })
    })
})

app.post('/students',(req,res)=>{
    MongoClient.connect(url,(err,database)=>{
        if(err){
            throw err
        }
        var mydb = database.db('mydb');
        mydb.collection('students').insertOne(req.body,(err,rs)=>{
            if(err){
                throw err
            }
            console.log('inserted one document')
            database.close()
            res.send(rs)
        })
    })
})

var server=app.listen(7777,function(req,res){
    console.log('App is listening on 7777')
})
