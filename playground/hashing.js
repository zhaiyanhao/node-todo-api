const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//jwt.sign
//jwt.verify

var message="reestestest";

var hash = SHA256(message).toString();

console.log(message,hash);

var data = {
    id:4
}
var token = {
    data,
    hash:SHA256(JSON.stringify(data)+'some code').toString() //salt token  jwt
}

var jwttoken = jwt.sign(data,'secrete');

vae decode = jwt.verify(jwttoken,'secrete');