define([ 'js/framework/framework.model' ], function (Model) {
    'use strict';

    var accountModel = new Model({
        endpoint : "/api/account"
    });

    return accountModel;
});