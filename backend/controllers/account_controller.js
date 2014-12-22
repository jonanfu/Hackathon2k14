"use strict";

var userModel = require('../models/user_model'),
    url = require('url');

function AccountController(){};

AccountController.prototype.post = function (req, res)
{
    var filter;

    filter = {
        email : req.body.email,
        password : req.body.password
    };

    userModel.find(filter, null, null, function(error, docs) {
        if(error === null)
        {
            if(docs.length === 1)
            {
                req.session.userId = docs[0]._id;
                req.session.isAdmin = docs[0].isAdmin;
                res.status(200).send({ isValid : true });
            }
            else
            {
                res.status(200).send({ isValid : false });
            }
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

AccountController.prototype.delete = function (req, res)
{
    try
    {
        req.session.userId = null;
        res.status(200).send({ deleted : true });
    }
    catch(error)
    {
        res.status(200).send({ deleted : false });
    }
};

module.exports = new AccountController();