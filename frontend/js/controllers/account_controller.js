define([
        'js/views/login_view',
        'js/models/account_model',
        'js/views/register_view'
    ],
    function (loginView, accountModel, registerView) {
        'use strict';

        function AccountController(){};

        AccountController.prototype.login = function(args) {
            loginView.render(args, function(){
                $('#email').focus();
                $(document).keypress(function(event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if(keycode == '13') {
                        var model = {
                            email : $('#email').val(),
                            password : $('#password').val()
                        };
                        accountModel.post(model, function(data) {
                            if (data.isValid === true) {
                                $('#logout-btn').fadeIn().removeClass('hide');
                                $('#login-btn').addClass('hide');
                                window.location.hash = "home/index";
                            }
                            else
                            {
                                $('#login_error').fadeIn().removeClass('hide');
                            }
                        });
                    }
                });
                $('#login-submit').on('click', function(){
                    var model = {
                        email : $('#email').val(),
                        password : $('#password').val()
                    };
                    accountModel.post(model, function(data) {
                        if (data.isValid === true) {
                            $('#logout-btn').fadeIn().removeClass('hide');
                            $('#login-btn').addClass('hide');
                            window.location.hash = "home/index";
                        }
                        else
                        {
                            $('#login_error').fadeIn().removeClass('hide');
                        }
                    });
                });
            });
        };

        AccountController.prototype.logout = function(args) {
            accountModel.delete(args, function(){
                $('#logout-btn').addClass('hide');
                $('#login-btn').fadeIn().removeClass('hide');
                window.location.hash = "home/index";
            });
        };

        AccountController.prototype.register = function(args) {
            registerView.render(args, function(){
                $('#email').focus();
                $(document).keypress(function(event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if(keycode == '13') {
                        var model = {
                            email : $('#emailCreate').val(),
                            password : $('#passwordCreate').val()
                        };
                        registerView.model.post(model, function() {
                            window.location.hash = "home/index";
                        });
                    }
                });
                $('#create-count').on('click', function(){
                    var model = {
                        email : $('#emailCreate').val(),
                        password : $('#passwordCreate').val()
                    };
                    registerView.model.post(model, function() {
                            
                        window.location.hash = "home/index";
                            
                        });
                    });
                });
        };

        return new AccountController();
    });