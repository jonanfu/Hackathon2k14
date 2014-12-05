"use strict";

var userModel = require('../models/user_model'),
    url = require('url');

function UserController(){};

UserController.prototype.get = function (req, res)
{
    var query, filter;

    query = url.parse(req.url, true).query;
    filter = {};

    if(query.id !== undefined) {
        filter._id = query.id
    }

    userModel.find(filter, null, null, function(error, docs) {
        if(error === null)
        {
            res.send(200, { user : docs });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

UserController.prototype.post = function (req, res)
{
    res.send(500, { data : 'TODO' });
};

UserController.prototype.put = function (req, res)
{
    res.send(500, { data : 'TODO' });
};

UserController.prototype.delete = function (req, res)
{
    res.send(500, { data : 'TODO' });
};

module.exports = new UserController();