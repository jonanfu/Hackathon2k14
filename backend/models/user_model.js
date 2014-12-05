"use strict";

var mongoose = require('mongoose'),
    collectionName = 'user',
    schema,
    model;

if (mongoose.modelNames().indexOf(collectionName) == -1)
{
    schema = new mongoose.Schema(
        {
            // TODO
        },
        {
            collection : collectionName
        }
    );

    model = mongoose.model(collectionName, schema);
}
else
{
    model = mongoose.model(collectionName);
}

module.exports = model;