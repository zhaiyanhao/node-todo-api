const _ = require('lodash');
require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');
var app = express();
const port = process.env.PORT||3000;
app.use(bodyParser.json());

var {authenticate } = require('./middleware/authenticate');

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

//Post user    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
app.post('/users',(req,res)=>{
   var body = _.pick(req.body,['email','password']);
   var user = new User(body);


   user.save().then(()=>{
       /*res.send(user);*/
       return user.generateAutoToken();
   }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
     res.status(404).send(e);
});
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(404).send(e);
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

app.delete('/todos/:id',(req,res)=>{
   //validate id
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        return res.status(404).send();
    });
});



/*Private route*/
app.get('/user/me',authenticate,(req,res)=>{
/*    var token = req.header('x-auth');

    User.findByToken(token).then((user)=>{

        if(!user){
           return Promise.reject('ttttttt')
        }
        res.send(user);
    }).catch((e)=>{

    });*/
    res.send(req.user);
})

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) &&body.completed){
        body.completedAt= new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        res.send({todo});
    });
});


app.listen(port,()=>{
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
