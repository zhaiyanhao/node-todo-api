/*const mongoClient = require('mongodb').MongoClient;*/

const {MongoClient,ObjectID} = require('mongodb');
/*var user = {name:'test',age:23};

var {name}= user;
ES6 destructure
*/

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("cannot connect to mongo db");
    }

    console.log("CONNECT TO MONGO DATABASE");

    db.collection('Todos').insertOne({
        text:'Something to do',
        completed:false
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert todo' , err);
        }

        console.log(JSON.stringify(result.ops));
    });

    db.collection('Users').insertOne({
       name:'zhai',
        age:24,
        location:'Hoboken'
    },(err,result)=>{
       if(err){
           return console.log('unable to add user');
       }

       console.log(result.ops[0]._id);
    });
    db.close();


});