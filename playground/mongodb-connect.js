const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
if(err)
    console.log('unable to connect ot database');
else
    console.log('connected ot database');

 const db = client.db('TodoApp') ;  

db.collection('Todos').insertOne({
    'text' : 'Something to do',
    'completed' : false
    }, (err, res) => {
        if (err)
            console.log("something went wrong");
        else
            console.log(JSON.stringify(res.ops, undefined, 2));    

    });    
client.close();
        
});