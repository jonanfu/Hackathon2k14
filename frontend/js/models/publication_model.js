define([
    'js/framework/framework.model',
    'js/helpers/helper'
], function (Model, helper) {
    'use strict';

    var publicationModel = new Model({
        endpoint : "/api/publications",
        formatter : function(data)
        {
            if(data.publication[0] !== undefined) {
                var publication = data.publication[0];
                publication.ticks = helper.ticksToDateString(publication.ticks);
                return publication;
            }
            else
            {
                return {};
            }
        }
    });

    return publicationModel;
});