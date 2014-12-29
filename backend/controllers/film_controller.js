"use strict";

var filmModel = require('../models/film_model'),
    url = require('url');

function FilmController(){};

FilmController.prototype.get = function (req, res)
{
    var query, filter;

    query = url.parse(req.url, true).query;
    filter = {};

    if(query.id !== undefined) {
        filter._id = query.id
    }

    filmModel.find(filter, null, null, function(error, docs) {
        if(error === null)
        {
            if(req.session.userId !== null)
            {
                res.status(200).send({ isAdmin : req.session.isAdmin, film : docs });
            }
            else
            {
                res.status(200).send({ isAdmin : false, film : docs });
            }
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

FilmController.prototype.post = function (req, res)
{
    var film;

    film = new filmModel({
        userId : req.session.userId,
        title : req.body.title,
        content : req.body.content,
        date : new Date().getTime(),
        manager : req.body.manager
    });

    film.save(function(error) {
        if(error === null)
        {
            res.send(200, { film : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

FilmController.prototype.put = function (req, res)
{
    var filmData;

    filmData = {
        title : req.body.title,
        content : req.body.content,
        manager : req.body.manager
    };

    filmModel.findByIdAndUpdate(req.body.id, filmData, function(error) {
        if(error === null)
        {
            res.send(200, { film : [] });
        }
        else
        {
            console.log(error);
            res.send(500, 'Internal Server Error');
        }
    });
};

FilmController.prototype.delete = function (req, res)
{
    var filter = { _id : req.body.id };
    filmModel.findOneAndRemove(filter, function(error) {
        if(error === null)
        {
            res.status(200).send({ film : [] });
        }
        else
        {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    });
};

module.exports = new FilmController();