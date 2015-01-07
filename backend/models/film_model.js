"use strict";

var mongoose = require('mongoose'),
    collectionName = 'films',
    schema,
    model;

if (mongoose.modelNames().indexOf(collectionName) == -1)
{
    schema = new mongoose.Schema(
        {
            userId : { type: mongoose.Schema.ObjectId, required: true },
            title : { type: String, required: true },
            content : { type: String, required: true },
            shortContent : { type: String, required: false },
            date : { type : Number, required : true },
            manager : { type : String, required : true },
            poster : { type : String, required : true }
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