define(['handlebars'],function(handlebars){
    "use strict";

    var View = function(config){
        this.container = config.container;
        this.templateUrl = config.templateUrl;
        this.compiledTemplate = null;
        this.model = config.model;
        this.isReady = false;
    };

    View.prototype.initialize = function(){
        var that = this;
        that.loadTemplate(function(template){
            that.compiledTemplate =  that.compileHbsTemplate(template);
            that.loadModel();
            that.isReady = true;
        });
    };

    View.prototype.loadTemplate = function(cb){
        var that = this;
        $.ajax({
            url : that.templateUrl,
            async : false,
            dataType : "text",
            success : function(template){
                cb(template);
            },
            error: function(a,b,c) {
                console.log(a,b,c);
            }
        });
    };

    View.prototype.loadModel = function() {
        var that = this;
        if (that.model !== null) {
            that.model.get();
        }
    };

    View.prototype.compileHbsTemplate = function(template) {
        return handlebars.compile(template);
    };

    View.prototype.render = function(cb){
        var html, hbsModel;
        if(this.isReady === false){
            throw new Error('Call View.initialize() first');
        }
        hbsModel = this.model || {};
        html = this.compiledTemplate(hbsModel);
        $(this.container).html(html);
        if(typeof cb === "function")
        {
            cb();
        }
    };

    return View;
});