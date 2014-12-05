define([ 'js/framework/framework.view' ], function (View) {
    'use strict';

    var footerView = new View({
        container : "#footer",
        templateUrl : "js/templates/footer.hbs",
        model : null
    });

    footerView.initialize();

    return footerView;
});