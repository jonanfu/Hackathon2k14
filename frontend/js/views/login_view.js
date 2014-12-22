define([ 'js/framework/framework.view' ], function (View) {
    'use strict';

    var loginView = new View({
        container : "#body",
        templateUrl : "js/templates/login.hbs",
        model : null,
        parseArgs : function(){
            return {};
        }
    });

    return loginView;
});