define([
        'js/views/publications_view',
        'js/views/publication_view',
        'js/views/comments_view',
        'js/views/editor_view'
    ],
    function (publicationsView, publicationView, commentsView, editorView) {
        'use strict';

        function HomeController(){};

        HomeController.prototype.index = function(args) {
            publicationsView.render(args, function(){});
        };

        HomeController.prototype.publication = function(args) {
            publicationView.render(args, function(){
                // set publication events

                // render comments
                commentsView.render(args, function(){
                    // set comments events
                    $('#guardar-comentario').on('click', function(e){
                        var nuevoComentario = {
                            publicationId : $('#comments').data('publication-id'),
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

        HomeController.prototype.publicationeditor = function(args) {
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
            publicationsView.model.delete({ id : args[0]}, function () {
                publicationsView.render({}, function(){});
            });
        };

        HomeController.prototype.deletecomment = function(args) {
            debugger;
            commentsView.model.delete({ publicationId : args[0], id : args[1]}, function () {
                window.location.hash = "home/publication/" + args[0];
            });
        };

        return new HomeController();
});