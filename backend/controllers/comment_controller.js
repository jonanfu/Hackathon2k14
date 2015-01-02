"use strict";

var commentModel = require('../models/comment_model'),
    url = require('url');

function CommentController(){};

CommentController.prototype.get = function (req, res)
{
    var query, filter;

    query = url.parse(req.url, true).query;
    filter = {};

    if(query.filmId !== undefined) {
        filter.filmId = query.filmId
    }

    commentModel.find(filter, null, null, function(error, docs) {
        if(error === null)
        {
            if(req.session.userId !== null)
            {
                res.status(200).send({ isAdmin : req.session.isAdmin, comment : docs });
            }
            else {
                res.status(200).send({ isAdmin : false, comment: docs});
            }
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

CommentController.prototype.post = function (req, res)
{
    var comment;

    if (req.session.userId === undefined || req.session.userId === null){
        console.log('Anonymus user');
        comment = new commentModel({
            filmId : req.body.filmId,       
            userId : "54a4297bbf312417b5ffac00",
            content : "(Anónimo)"+"\n\ "+req.body.content,        
            date : new Date().getTime()
        });
    }
    else{
        comment = new commentModel({
            filmId : req.body.filmId,       
            userId : req.session.userId,        
            content : req.body.content,        
            date : new Date().getTime()
        });
    };

    

    comment.save(function(error) {
        if(error === null)
        {
            res.status(200).send({ comment : [] });
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

CommentController.prototype.put = function (req, res)
{
    var commentData;

    commentData = {
        content : req.body.content
    };

    commentModel.findByIdAndUpdate(req.body.id, commentData, function(error) {
        if(error === null)
        {
            res.send(200, { comment : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

CommentController.prototype.delete = function (req, res)
{
    var filter = { _id : req.body.id };
    commentModel.findOneAndRemove(filter, function(error) {
        if(error === null)
        {
            res.send(200, { comment : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

module.exports = new CommentController();