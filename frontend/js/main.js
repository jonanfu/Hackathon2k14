require([
        'js/framework/framework.app',
        'js/views/header_view',
        'js/views/footer_view',
        'js/controllers/home_controller',
        'js/controllers/account_controller'
    ],
    function (App, headerView, footerView, homeController, accountController) {
        'use strict';

        var myApp = new App({
            controllers : {
                home : homeController,
                account : accountController
            }
        });

        myApp.initialize();
        headerView.render();
        footerView.render();
});