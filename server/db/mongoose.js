var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

//Attention!!
module.exports = {
    mongoose:mongoose
    //mongoose
};