"use strict";

var express = require('express'),
    path = require("path"),
    mongoose = require('mongoose'),
    commentController = require('./controllers/comment_controller'),
    userController = require('./controllers/user_controller'),
    secrets = require('./config/secrets'),
    app, router;

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

app = express();
app.use(express.static(__dirname ));

app.controllers = {
    comments : commentController,
    users : userController
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
        action = controller[req.params.action] || controller[req.method.toLowerCase()];

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
    if(req.url.indexOf("backend") === -1) {
        var url = path.join(__dirname, "../frontend/", req._parsedUrl.pathname);
        if (req.url === "/" || req.url === "/frontend/") {
            url = path.join(__dirname, "../frontend/index.html");
            res.sendfile(url);
        }
        else {
            res.sendfile(url);
        }
    }
    else{
        next();
    }
}

// static files
app.use(StaticFileRequest);

// web api services
app.get('/backend/:controller/:action', ApiRequest);
app.get('/backend/:controller', ApiRequest);

app.listen(8080);
console.log('App listening at :8080');

module.exports = app;