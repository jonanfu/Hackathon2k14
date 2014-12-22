"use strict";

var publicationModel = require('../models/publication_model'),
    url = require('url');

function PublicationController(){};

PublicationController.prototype.get = function (req, res)
{
    var query, filter;

    query = url.parse(req.url, true).query;
    filter = {};

    if(query.id !== undefined) {
        filter._id = query.id
    }

    publicationModel.find(filter, null, null, function(error, docs) {
        if(error === null)
        {
            if(req.session.userId !== null)
            {
                res.status(200).send({ isAdmin : req.session.isAdmin, publication : docs });
            }
            else
            {
                res.status(200).send({ isAdmin : false, publication : docs });
            }
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

PublicationController.prototype.post = function (req, res)
{
    var publication;

    publication = new publicationModel({
        userId : req.session.userId,
        title : req.body.title,
        content : req.body.content,
        ticks : new Date().getTime()
    });

    publication.save(function(error) {
        if(error === null)
        {
            res.send(200, { publication : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

PublicationController.prototype.put = function (req, res)
{
    var publicationData;

    publicationData = {
        title : req.body.title,
        content : req.body.content
    };

    publicationModel.findByIdAndUpdate(req.body.id, publicationData, function(error) {
        if(error === null)
        {
            res.send(200, { publication : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

PublicationController.prototype.delete = function (req, res)
{
    var filter = { _id : req.body.id };
    publicationModel.findOneAndRemove(filter, function(error) {
        if(error === null)
        {
            res.status(200).send({ publication : [] });
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

module.exports = new PublicationController();