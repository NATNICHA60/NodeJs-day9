const path = require('path');
const ejs = require('ejs');
const express = require('express');
const morgan = require('morgan');
const todos = require('./routes/todos');
const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
// logger
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static('public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  res.render('index', {
    name: "Sawanya",
    pets: ["Stamp", "Snow"]
  });
});

app.use('/todos', todos);

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});