define([
    'js/framework/framework.view',
    'js/models/publication_model'
], function (View, publicationModel) {
    'use strict';

    var publicationView = new View({
        container : "#body",
        templateUrl : "js/templates/publication.hbs",
        model : publicationModel,
        parseArgs : function(args){
            return {
                id : args[0]
            };
        }
    });

    return publicationView;
});