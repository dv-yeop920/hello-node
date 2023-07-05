const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8080;
const URL = 'mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine' , 'ejs');

let db;

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

app.get('/list' , (request , response) => {
    db.collection('post').find().toArray((error , result) => {
        console.log(result);
        response.render('list.ejs' , {posts : result});
    });
})

app.post('/add' , (request , response) => {
    response.send(request.body.content)

    db.collection('counter').findOne({name: 'detailCount'} , (error , result) => {
        let count  = result.totalPost;
        console.log(result.totalPost);
        console.log(request.body.content);

        db.collection('post').insertOne(
            {
                _id: count + 1 ,
                content :request.body.content,
                date:'2023-07-05'
            }, 
            (error , result2) => {
                error ? console.log('error발생'): console.log('저장 성공');

                db.collection('counter').updateOne({name: 'detailCount'} , {$inc:{totalPost: +1}} , 
                    () => {})
            });
    });

    
})





