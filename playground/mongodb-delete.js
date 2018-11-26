const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
if(err)
    console.log('unable to connect ot database');
else
    console.log('connected ot database');

db.collection('Todos').findOneAndDelete({text : 'buy a bike'}).then((res) => {
    console.log(res);
});    

});