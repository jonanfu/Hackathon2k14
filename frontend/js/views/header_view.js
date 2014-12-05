define([ 'js/framework/framework.view' ], function (View) {
    'use strict';

    var headerView = new View({
        container : "#header",
        templateUrl : "js/templates/header.hbs",
        model : null
    });

    headerView.initialize();

    return headerView;
});