define([
    'js/framework/framework.view',
    'js/models/film_model'
], function (View, filmModel) {
    'use strict';

    var filmView = new View({
        container : "#body",
        templateUrl : "js/templates/film.hbs",
        model : filmModel,
        parseArgs : function(args){
            return {
                id : args[0]
            };
        }
    });

    return filmView;
});