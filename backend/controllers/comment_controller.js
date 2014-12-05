"use strict";

var commentModel = require('../models/comment_model'),
    url = require('url');

function CommentController(){};

CommentController.prototype.get = function (req, res)
{
    var query, filter;

    query = url.parse(req.url, true).query;
    filter = {};

    if(query.id !== undefined) {
        filter._id = query.id
    }

    commentModel.find(filter, null, null, function(error, docs) {
        if(error === null)
        {
            res.send(200, { comment : docs });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

CommentController.prototype.post = function (req, res)
{
    res.send(500, { data : 'TODO' });
};

CommentController.prototype.put = function (req, res)
{
    res.send(500, { data : 'TODO' });
};

CommentController.prototype.delete = function (req, res)
{
    res.send(500, { data : 'TODO' });
};

module.exports = new CommentController();