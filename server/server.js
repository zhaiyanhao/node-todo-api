var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//save new somgthing

var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:5

    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number
    }
});

var newTodo =new Todo({
   text:'cook dinner'
});

newTodo.save().then((doc)=>{
    console.log('Saved to do',doc);
},(e)=>{

});