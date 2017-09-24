var mongoose = require('mongoose');

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

module.exports = {Todo};