"use strict";

require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const routes = require('./routes');
const morgan = require('morgan');

// Database Initialization
const db = require('mongoose');
const dbName = 'prfltrckr-test'; // prfltrckr

//TODO: save mongo urls to env vars
db.connect('mongodb://localhost:27017/' + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var connection = db.connection;
connection.on('error', console.error.bind(console, 'Database Connection Error:'));
connection.once('open', function() {

    console.log("Connected successfully to database!");
    //app.set('view engine', 'ejs');
    //app.use(express.static('views/css'));

    app.use(morgan(process.env.ENV));
    app.use(express.json());

    app.use('/', routes);

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message
            }
        });
    });

    module.exports = app;

    if (process.env.ENV == 'dev' || process.env.ENV == 'prod') {
        const server = http.createServer(app);
        server.listen(process.env.PORT);
    }

});
