const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority';
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
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
});

app.get('/detail/:id' , (request , response) => {
    db.collection('post').findOne({_id: parseInt(request.params.id)} , (error , result) => {
        console.log(result);
        response.render('detail.ejs' , {data: result});
    });
});

app.get('/detailEdit/:id' , (request , response) => {
    db.collection('post').findOne({_id: parseInt(request.params.id)} , (error , result) => {
        console.log(result);
        response.render('detailEdit.ejs' , {data: result});
    });
})


app.post('/add' , (request , response) => {
    response.send(request.body.content);

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
});

app.put('/edit' , (request , response) => {
    db.collection('post').updateOne({_id: parseInt(request.body.id)} ,{$set:{content: request.body.content}},
    (error , result) => {
        console.log('수정 완료');
        response.redirect('/list');
    })
})

app.delete('/delete' , (request , response) => {
    const id = request.body = parseInt(request.body._id);
    console.log(request.body);
    db.collection('post').deleteOne({_id: id} ,(error , result) => {
        console.log('삭제 완료');
        response.status(200).send({message : '성공'});
        if(error) return response.status(400).send({message : '실패'});
    });
});


//세션스토리지 이용하기 위한 기본 셋팅
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');

//미들웨어 
app.use(session({secret:'비밀코드' , resave: true , saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login' , (request , response) => {
    response.render('login.ejs')
})
app.post('/login' , passport.authenticate('local' , {
    failureRedirect: '/fail'
}) ,(request , response) => {
    response.redirect('/todo');
});

passport.use(new localStrategy({
    usernameField: 'id',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
}, function (id, password, done) {
    //console.log(id, password);
    db.collection('login').findOne({ id: id }, function (error, result) {
        if (error) return done(error);
        if (!result) return done(null, false, { message: '존재하지않는 아이디요' });
        if (password == result.password) {
        return done(null, result);
    } else {
        return done(null, false, { message: '비번틀렸어요' });
    }
    })
}));

passport.serializeUser((user , done) => {
    done(null, user.id);
});
passport.deserializeUser((id , done) => {
    done(null , {});
})





