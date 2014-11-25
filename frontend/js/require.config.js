require.config({
    baseUrl: './',
    waitSeconds: 45,
    shim: {
        Bootstrap: { deps: ['jQuery'], exports: 'Bootstrap' }
    },
    paths: {
        jQuery : "bower_components/jquery/dist/jquery.min",
        Bootstrap : "bower_components/bootstrap/dist/js/bootstrap.min",
        Handlebars: "bower_components/handlebars/handlebars.min"
    },
    // desabilitar cache (no recomendado en producion)
    urlArgs: 'bust=' + (new Date()).getTime()
});