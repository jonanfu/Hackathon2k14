define([ 
    'js/framework/framework.view',
    'js/models/user_model'
], function (View, userModel) {
    'use strict';

    var registerView = new View({
        container : "#body",
        templateUrl : "js/templates/register.hbs",
        model : userModel,
        parseArgs : function(){
            return {};
        }
    });

    return registerView;
});