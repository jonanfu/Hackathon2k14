"use strict";

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require("path"),
    mongoose = require('mongoose'),
    commentController = require('./controllers/comment_controller'),
    userController = require('./controllers/user_controller'),
    filmController = require('./controllers/film_controller'),
    accountController = require('./controllers/account_controller'),
    secrets = require('./config/secrets'),
    app, router;

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

app = express();
app.use(express.static(__dirname ));
app.use(bodyParser.json());
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: true}));

app.controllers = {
    comments : commentController,
    users : userController,
    films : filmController,
    account : accountController
};

function ApiRequest(req, res, next)
{
    var controller, action;

    controller = app.controllers[req.params.controller.toLowerCase()];

    if (controller === undefined)
    {
        res.send(404, 'Controller Not found!');
    }
    else
    {
        action = controller[req.method.toLowerCase()];

        if (action === undefined)
        {
            res.send(404, 'Action Not found!');
        }
        else
        {
            if (typeof action !== "function")
            {
                res.send(500, 'Could not find action in controller');
            }
            else
            {
                try
                {
                    action(req, res, next);
                }
                catch (error)
                {
                    console.log(error);
                    res.send(500, 'Internal Server Error');
                }
            }
        }
    }
}

function StaticFileRequest(req, res, next)
{
    if(req.url.indexOf("api") === -1) {
        var url = path.join(__dirname, "../frontend/", req._parsedUrl.pathname);
        if (req.url === "/" || req.url === "/frontend/") {
            url = path.join(__dirname, "../frontend/index.html");
            res.sendFile(url);
        }
        else {
            res.sendFile(url);
        }
    }
    else{
        next();
    }
}

// static files
app.use(StaticFileRequest);

// web api services
app.get('/api/:controller', ApiRequest);
app.post('/api/:controller', ApiRequest);
app.put('/api/:controller', ApiRequest);
app.delete('/api/:controller', ApiRequest);

app.listen(5000);
console.log('App listening at : 5000');

module.exports = app;