const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("cannot connect to mongo db");
    }

    db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs));
    },(err)=>{

    });


    db.collection('Todos').find({completed:true}).count().then((count)=>{
        console.log(count);
    },(err)=>{

    });



    db.close();
});