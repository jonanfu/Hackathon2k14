require([ 'js/framework/framework.app', 'js/views/header_view', 'js/views/footer_view' ],
    function (App, HeaderView, FooterView) {
        'use strict';

        var app = window.app = new App({ title : 'Aplicacion de prueba'});
        app.initialize();
        HeaderView.render();
        FooterView.render();
});