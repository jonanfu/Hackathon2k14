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
            res.status(200).send({ user : docs });
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
    var user;

    user = new userModel({
        email : req.body.email,
        password : req.body.password,
        isAdmin : false
    });

    user.save(function(error) {
        if(error === null)
        {
            res.status(200).send({ user : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

UserController.prototype.put = function (req, res)
{
    var userData;

    userData = {
        email : req.body.email,
        password : req.body.password,
        isAdmin : false
    };

    userModel.findByIdAndUpdate(req.body.id, userData, function(error) {
        if(error === null)
        {
            res.send(200, { user : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

UserController.prototype.delete = function (req, res)
{
    var filter = { _id : req.body.id };
    userModel.findOneAndRemove(filter, function(error) {
        if(error === null)
        {
            res.send(200, { user : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

module.exports = new UserController();