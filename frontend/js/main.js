require([
        'js/framework/framework.app',
        'js/views/header_view',
        'js/views/footer_view',
        'js/controllers/home_controller'
    ],
    function (App, headerView, footerView, homeController) {
        'use strict';

        var myApp = new App({
            controllers : {
                home : homeController
            }
        });

        myApp.initialize();
        headerView.render();
        footerView.render();
});