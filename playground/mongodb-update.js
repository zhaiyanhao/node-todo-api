const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("cannot connect to mongo db");
    }

    db.collection('Todos').findOneAndUpdate({text:'walk the dog'},{

        $set:{
            completed:true
        }

        //$inc  { age:1}

        //all manipulation is in docs.mongodb.com/manual
    },
    {
        returnOriginal:false
    }
    );

    //_id:new ObjectID('````````');

    db.close();
});