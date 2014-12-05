define([], function () {
    'use strict';

    function HomeController(){};

    HomeController.prototype.index = function() {
        console.log('TODO HomeController.prototype.index()');
    };

    HomeController.prototype.chat = function() {
        console.log('TODO HomeController.prototype.chat()');
    };

    HomeController.prototype.users = function() {
        console.log('TODO HomeController.prototype.users()');
    };

    return new HomeController();
});