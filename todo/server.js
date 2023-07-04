const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8080;
const URL = 'mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.urlencoded({extended: true}));

let db;

const obj = {
    id:0,
    name:'Lee',
    age:27
}

MongoClient.connect(URL , (error , client) => {
    if(error) return console.log(error);
    db = client.db('todo');
    app.listen(port , () => {
        console.log('hello world');
    });
});


app.get('/todo' , (request , response) => {
    response.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/add' , (request , response) => {
    response.send(request.body.content)
    let obj = {
        id:1,
        content: request.body.content,
        date:'2023-07-05'
    }
    console.log(request.body.content)
    db.collection('post').insertOne(obj , (error , result) => {
        console.log('저장 성공')
    })
})





