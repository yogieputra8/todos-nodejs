var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000
var todos = [];
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Todo API root')
});


// GET /todos?completed=false&q=work
app.get('/todos', function(req, res) {
  var queryParams = req.query;
  var filterTodos = todos;

  if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
    filterTodos = _.where(filterTodos, {
      completed: true
    });
  } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    filterTodos = _.where(filterTodos, {
      completed: false
    });
  }

  if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
    filterTodos = _.filter(filterTodos, function(todo) {
      return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
    });
  }

  res.json(filterTodos);

});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);

  var matchedTodo = _.findWhere(todos, {
    id: todoId
  });

  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }


  // var matchedTodo;
  //
  // // Iterate of todo array. find the match
  // todos.forEach(function (cak){
  //   if ( todoId === cak.id){
  //     matchedTodo = cak;
  //   }
  // });
  //
  // if (matchedTodo){
  //   res.json(matchedTodo);
  // } else {
  //   res.status(404).send();
  // }
});


// POST /todos/:id
app.post('/todos', function(req, res) {
  var body = _.pick(req.body, 'description', 'completed'); //req.body;



  // Todo.create({
  //   description: 'beli iMac'
  // }).then(function(todo) {
  //   // console.log('Finished!');
  //   // console.log(todo);
  //   return Todo.create({
  //     description: 'beli Apple TV'
  //   });
  // }).then(function() {
  //   // return Todo.findById(1)
  //   return Todo.findAll({
  //     where: {
  //       description: {
  //         $like: '%App%'
  //       }
  //     }
  //   });
  // }).then(function(todos) {
  //   if (todos) {
  //     todos.forEach(function (todo) {
  //       console.log(todo.toJSON());
  //     })
  //   } else {
  //     console.log('no todo found!');
  //   }
  // }).catch(function(e) {
  //   console.log(e);
  // });

  db.todo.create(body).then(function (todo){
    res.status(200).json(todo.toJSON());
  }, function(e){
    res.status(400).json(e);
  });


  //   {
  //   description: body.description,
  //   completed: body.completed
  // }).then(function(todos, e) {
  //   if (todos) {
  //     res.status(200).json(todos);
  //   } else {
  //     res.status(400).json(e);
  //   }
  // });



  // if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
  //   return res.status(400).send();
  // }
  //
  // body.description = body.description.trim();
  //
  // // add ID field
  // body.id = todoNextId++;
  //
  // // push body into array
  // todos.push(body);
  //
  // // console.log('description: ' + body.description);
  // res.json(body);
});



// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {
    id: todoId
  });

  if (!matchedTodo) {
    res.status(404).json({
      "errror": "no todo found with that ID!"
    })
  } else {
    todos = _.without(todos, matchedTodo);
    res.json(matchedTodo);
  }

});



// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {
    id: todoId
  });
  var body = _.pick(req.body, 'description', 'completed');
  var validateAttribute = {};


  if (!matchedTodo) {
    return res.status(404).send();
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validateAttribute.completed = body.completed;
  } else if (body.hasOwnProperty('completed')) {
    return res.status(400).send();
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
    validateAttribute.description = body.description
  } else if (body.hasOwnProperty('description')) {
    return res.status(400).send();
  }

  _.extend(matchedTodo, validateAttribute);
  res.json(matchedTodo);

})


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('Express listening on port ' + PORT + '!');
  });
});
