const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
if(err)
    console.log('unable to connect ot database');
else
    console.log('connected ot database');

//const db = client.db('TodoApp') ;
    db.collection('Todos').find({completed : true}).toArray().then((docs) => {
    console.log("Todos");
    console.log(JSON.stringify(docs, undefined, 2))
},(err) => {
    console.log("unable to fetch data", err);
});


 //client.close();

});