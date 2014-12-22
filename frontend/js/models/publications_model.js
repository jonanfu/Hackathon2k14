define([
    'js/framework/framework.model',
    'js/helpers/helper'
], function (Model, helper) {
    'use strict';

    var publicationModel = new Model({
        endpoint : "/api/publications",
        formatter : function(data){
            var i = 0;
            for(i; i < data.publication.length; i++){
                data.publication[i].ticks = helper.ticksToDateString(data.publication[i].ticks);
            }
            return data;
        }
    });

    return publicationModel;
});