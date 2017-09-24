var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body);
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.send(e);
    });
});

app.listen(3000,()=>{
    console.log('starting from server',3000);
});




/*
var newTodo =new Todo({
   text:'cook dinner'
});

newTodo.save().then((doc)=>{
    console.log('Saved to do',doc);
},(e)=>{

});




var user = new User({
   email:"howardzhai@gmail.com",
    password:'12345'
});

user.save().then((doc)=>{

});*/
