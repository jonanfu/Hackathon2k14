define([
        'js/views/films_view',
        'js/views/film_view',
        'js/views/comments_view',
        'js/views/editor_view'
    ],
    function (filmsView, filmView, commentsView, editorView) {
        'use strict';

        function HomeController(){};

        HomeController.prototype.index = function(args) {
            filmView.render(args, function(){});
        };

        HomeController.prototype.film = function(args) {
            filmsView.render(args, function(){
                // set publication events

                // render comments
                commentsView.render(args, function(){
                    // set comments events
                    $('#guardar-comentario').on('click', function(e){
                        var nuevoComentario = {
                            filmId : $('#comments').data('film-id'),
                            content : $('#comentario').val()
                        };
                        commentsView.model.post(nuevoComentario, function (data) {
                            commentsView.render(args, function(){
                                $(window).trigger('hashchange');
                            });
                        })
                    });
                });
            });
        };

        HomeController.prototype.filmeditor = function(args) {
            editorView.render(args, function () {
                // set events
                $('#editor-submit-btn').on('click', function(e) {
                    if (args[0] !== undefined) {
                        var data = {
                            id: args[0],
                            title: $('#titulo').val(),
                            content: $('#contenido').val()
                        };
                        editorView.model.put(data, function (response) {
                            window.location.hash = "home/index";
                        });
                    }
                    else
                    {
                        var data = {
                            title: $('#titulo').val(),
                            content: $('#contenido').val()
                        };
                        editorView.model.post(data, function (response) {
                            window.location.hash = "home/index";
                        });
                    }
                });
            });
        };

        HomeController.prototype.deleteeditor = function(args) {
            filmsView.model.delete({ id : args[0]}, function () {
                filmsView.render({}, function(){});
            });
        };

        HomeController.prototype.deletecomment = function(args) {
            debugger;
            commentsView.model.delete({ filmId : args[0], id : args[1]}, function () {
                window.location.hash = "home/film/" + args[0];
            });
        };

        return new HomeController();
});