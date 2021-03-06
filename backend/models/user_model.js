"use strict";

var mongoose = require('mongoose'),
    collectionName = 'users',
    schema,
    model;

if (mongoose.modelNames().indexOf(collectionName) == -1)
{
    schema = new mongoose.Schema(
        {
            email : { type: String, required: true },
            password : { type: String, required: true },
            isAdmin : { type: Boolean, required: true }
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