define([ 'js/framework/framework.model' ], function (Model) {
    'use strict';

    var userModel = new Model({
        endpoint : "/api/users"
    });

    return userModel;
});