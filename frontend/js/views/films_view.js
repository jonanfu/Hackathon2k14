define([
    'js/framework/framework.view',
    'js/models/films_model'
], function (View, filmsModel) {
    'use strict';

    var filmsView = new View({
        container : "#body",
        templateUrl : "js/templates/films.hbs",
        model : filmsModel,
        parseArgs : function()
        {
            return {};
        }
    });

    return filmsView;
});