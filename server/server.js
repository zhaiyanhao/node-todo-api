var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');
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

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res)=>{

    const id = req.params.id;

    //validate id
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todos)=>{
    res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});


app.listen(3000,()=>{
    console.log('starting from server',3000);
});

module.exports={app};


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
