const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id='59c6b2e0e7512f163a35f9fd';



//this is array
Todo.find({
    _id:id
}).then((todos)=>{

});

Todo.findOne({
    _id:id
}).then((todos)=>{

});

Todo.findById(id).then(()=>{

}).catch((e)=>{

});