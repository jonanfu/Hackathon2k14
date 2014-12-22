define([
    'js/framework/framework.view',
    'js/models/publications_model'
], function (View, publicationsModel) {
    'use strict';

    var publicationsView = new View({
        container : "#body",
        templateUrl : "js/templates/publications.hbs",
        model : publicationsModel,
        parseArgs : function()
        {
            return {};
        }
    });

    return publicationsView;
});