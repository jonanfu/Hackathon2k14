define([
    'js/framework/framework.model',
    'js/helpers/helper'
], function (Model, helper) {
    'use strict';

    var commentsModel = new Model({
        endpoint : "/api/comments",
        formatter : function(data){
            var i = 0;
            for(i; i < data.comment.length; i++){
                data.comment[i].date = helper.ticksToDateString(data.comment[i].date);
            }
            return data;
        }
    });

    return commentsModel;
});