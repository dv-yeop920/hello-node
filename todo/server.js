const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true}));


app.get('/todo' , (request , response) => {
    response.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(port , () => {
    console.log('hello world');
});

app.post('/add' , (request , response) => {

})





