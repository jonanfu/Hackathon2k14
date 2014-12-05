require.config({
    baseUrl: './',
    waitSeconds: 45,
    shim: {
        jquery: { deps: [], exports: 'jquery' },
        handlebars: { deps: [], exports: 'handlebars' },
        bootstrap: { deps: ['jquery'], exports: 'bootstrap' }
    },
    paths: {
        jquery : "../bower_components/jquery/dist/jquery.min",
        bootstrap : "../bower_components/bootstrap/dist/js/bootstrap.min",
        handlebars: "../bower_components/handlebars/handlebars.min"
    },
    // desabilitar cache (no recomendado en producion)
    urlArgs: 'bust=' + (new Date()).getTime()
});