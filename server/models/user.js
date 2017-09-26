var mongoose = require('mongoose');

/*{
    email:'howard@gmail.com',
    password:'sdf23efdsfsdf',
    tokens:[{
        access:'auth',
        token:'sdfdsfdsfdsfdsf'
    }]
}*/

var User  = mongoose.model('User',{
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String
    }
});

module.exports = {User};