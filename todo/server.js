const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8080;
const URL = 'mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(URL , (error , client) => {
    app.listen(port , () => {
        console.log('hello world');
    });
});


app.get('/todo' , (request , response) => {
    response.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/add' , (request , response) => {
    response.send(request.body.content)
    console.log(request.body.content)
})





