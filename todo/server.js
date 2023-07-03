const express = require('express');
const app = express();

app.listen(8080 , () => {
    console.log('hello!');
});


app.get('/hello' , (request , reponse) => {
    reponse.sendFile(__dirname + '/index.html');
});