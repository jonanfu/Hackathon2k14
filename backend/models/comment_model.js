"use strict";

var mongoose = require('mongoose'),
    collectionName = 'comments',
    schema,
    model;

if (mongoose.modelNames().indexOf(collectionName) == -1)
{
    schema = new mongoose.Schema(
        {
            talkId: { type: mongoose.Schema.ObjectId, required: true },
            content: { type: String, required: true },
            userId : [ { type: mongoose.Schema.ObjectId, required: true } ],
            isTroll : { type: Boolean, required: true },
            downVoted : { type: Number, required: true },
            upVoted : { type: Number, required: true },
            ticks : { type : Number, required : true }
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