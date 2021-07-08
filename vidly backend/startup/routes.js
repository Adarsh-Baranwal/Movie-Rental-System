const movies=require('../routes/movies');
const users=require('../routes/users');
const customers=require('../routes/customers');
const auth=require('../routes/auth');
const error=require('../middleware/error');
const rentals = require('../routes/rentals');
const generes=require('../routes/generes');
const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/generes',generes);
    app.use('/api/movies',movies);
    app.use('/api/users',users);
    app.use('/api/customers',customers);
    app.use('/api/auth',auth);
    app.use('/api/rentals', rentals);
    app.use(error);
  }