define([
    'js/framework/framework.view',
    'js/models/publication_model'
], function (View, publicationModel) {
    'use strict';

    var publicationView = new View({
        container : "#body",
        templateUrl : "js/templates/editor.hbs",
        model : publicationModel,
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

    return publicationView;
});