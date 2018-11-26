const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
if(err)
    console.log('unable to connect ot database');
else
    console.log('connected ot database');

db.collection('Todos').findOneAndUpdate({_id :new ObjectID("5bf7c9755d7903b9fe06e968")},
{$set : { completed : false}},
{
    returnOriginal : false
}).then((res) => {
    console.log(res);
});    

});