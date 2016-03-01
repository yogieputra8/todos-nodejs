var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite',
  'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 250]
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

sequelize.sync({
  // force: true
}).then(function() {
  console.log('Everything is synced!');

  // Todo.findAll().then(function (todos) {
  //   if (todos.length !== 0) {
  //       console.log('Here we go!');
  //   } else {
  //     console.log('no todo found!');
  //   }
  // })

  Todo.findById(1).then(function (todo) {
    if (todo) {
        console.log(todo.toJSON());
    } else {
      console.log('no todo found!');
    }
  })



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
});
