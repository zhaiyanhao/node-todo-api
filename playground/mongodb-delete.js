const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("cannot connect to mongo db");
    }

    //deleteOne
    //findOneAndDelete

    db.collection('Todos').deleteOne({text:'not right'}).then((res)=>{

        },(err)=>{

    });



db.close();
});