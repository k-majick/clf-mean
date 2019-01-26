const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

const app = express();
const port = 7777;
const users = require('./routes/users');

// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {
    useNewUrlParser: true,
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log(`Connected to database ${config.database}`))
  .catch((err) => console.log(`Database error: ${err}`));

// Cors
//app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  // res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

app.get('/', function(req, res, next) {
  res.send('Invalid endpoint');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
