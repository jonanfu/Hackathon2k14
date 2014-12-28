define([
    'js/framework/framework.model',
    'js/helpers/helper'
], function (Model, helper) {
    'use strict';

    var filmModel = new Model({
        endpoint : "/api/films",
        formatter : function(data)
        {
            if(data.film[0] !== undefined) {
                var film = data.film[0];
                film.ticks = helper.ticksToDateString(film.ticks);
                return film;
            }
            else
            {
                return {};
            }
        }
    });

    return filmModel;
});