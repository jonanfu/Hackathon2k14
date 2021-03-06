define([
    'js/framework/framework.view',
    'js/models/film_model'
], function (View, filmModel) {
    'use strict';

    var filmView = new View({
        container : "#body",
        templateUrl : "js/templates/editor.hbs",
        model : filmModel,
        parseArgs : function(args){
            if(args[0] !== undefined){
                return {
                    id : args[0]
                };
            }
            else
            {
                return null;
            }
        }
    });

    return filmView;
});