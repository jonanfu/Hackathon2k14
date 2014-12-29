define([
    'js/framework/framework.view',
    'js/models/comment_model'
], function (View, commentModel) {
    'use strict';

    var commentsView = new View({
        container : "#comments",
        templateUrl : "js/templates/comments.hbs",
        model : commentModel,
        parseArgs : function(args){
            return {
                filmId : args[0]
            };
        }
    });

    return commentsView;
});