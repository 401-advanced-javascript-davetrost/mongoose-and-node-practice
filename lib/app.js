const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
// request logging
app.use(morgan('dev'));
// body parser
app.use(express.json());
// static file server (public)
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

// app.use(checkConnection);
// API ROUTES


// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;