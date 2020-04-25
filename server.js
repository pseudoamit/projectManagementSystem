const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Project');
const users = require('./routes/api/users');
const project = require('./routes/api/projects');
const app = express();

//Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Connect to the database
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

// routing method to test the application
// app.get("/api/hello", (req, res) => {
//   res.send("Welcome to the project management system");
// });

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./services/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/projects', project);

//process.env.PORT needs when we deploy it to Heroku server and 5000 is the local server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
