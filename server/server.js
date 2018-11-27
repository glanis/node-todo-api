var express = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    },
        (e) => {
            res.status(400).send(e);
        });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.send(err);
    })
})

app.get('/todos/:id', (req, res) => {
        id = req.params.id;
        if (!ObjectID.isValid(id))
            return res.status(404).send("not a valid ID")
        Todo.findById(id).then((todo) => {
            if(!todo)
                return res.status(404).send("id "+id+ " not found in database");
             res.status(200).send({todo});
        }, (err) => {
            return res.status(400).send(err);
        })    
});

app.delete('/todos/:id', (req, res) => {
    id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send("not a valid ID");    
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo)
            return res.status(404).send();
        return res.send({todo, "msg" : "item deleted sucessfully"})    
    }).catch((e) => {
        return res.status(400).send();

    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });

app.listen(port, () => {
    console.log("server is running in "+port)
});

module.exports = { app }