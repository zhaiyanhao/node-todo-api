var mongoose = require('mongoose');
const  validator = require('validator');
var jwt = require('jsonwebtoken');

const _ = require('lodash');
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{  //validator:validator.isEmail,
            return validator.isEmail(value);
    },
    message:'{VALUE} IS NOT VALID'
    }
    },
    password:{
        type:String,
            required:true,
            minlength:6
    },
    token:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

/*{
    email:'howard@gmail.com',
    password:'sdf23efdsfsdf',
    tokens:[{
        access:'auth',
        token:'sdfdsfdsfdsfdsf'
    }]
}*/


/* PASSWORD SHOULD NOT pass back to user*/
/*THIS IS OVERRIDE THe functon*/
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAutoToken = function () {
    var user  = this;  //method is used for instance
    var access = "auth";
    var token = jwt.sign({_id:user._id.toHexString(),access},'secret word').toString();
    user.token.push({access,token});

    return user.save().then(()=>{
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    //statics use for model
    var User = this;
    var decode;
    try{
        decode = jwt.verify(token,'secret word');
    }catch (e){
/*        return new Promise((resolve,reject)=>{
            reject();
            });*/
            return Promise.reject('test failed');
    }

    return User.findOne({
        _id:decode._id,
        'token.token':token
        });
};
var User  = mongoose.model('User',UserSchema);

module.exports = {User};