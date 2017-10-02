var {User} = require('./../models/user');

/*make middle ware to auth all the time*/
var authenticate =(req,res,next) =>{
    var token = req.header('x-auth');

    User.findByToken(token).then((user)=>{

        if(!user){
        return Promise.reject('ttttttt')
    }
    req.user= user;
    req.token = token;
    next();
}).catch((e)=>{

    });
}


module.exports = {authenticate};