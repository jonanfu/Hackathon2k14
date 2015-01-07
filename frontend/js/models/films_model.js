define([
    'js/framework/framework.model',
    'js/helpers/helper'
], function (Model, helper) {
    'use strict';

    var filmModel = new Model({
        endpoint : "/api/films",
        formatter : function(data){
            var i = 0;
            for(i; i < data.film.length; i++){
                data.film[i].date = helper.ticksToDateString(data.film[i].date);
                data.film[i].shortContent = helper.shortContent(data.film[i].content);
            }
            return data;
        }
    });

    return filmModel;
});