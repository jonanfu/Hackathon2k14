define(['handlebars'],function(handlebars){
    "use strict";

    var View = function(config) {
        this.container = config.container;
        this.templateUrl = config.templateUrl;
        this.model = config.model;
        this.parseArgs = config.parseArgs
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
                console.log("AJAX ERROR: ",a,b,c);
            }
        });
    };

    View.prototype.render = function(args, cb){
        var that = this;
        args = that.parseArgs(args);

        that.loadTemplate(function(template){
            var html, compiledTemplate;
            compiledTemplate =  handlebars.compile(template);
            if(that.model != null && args != null)
            {
                that.model.get(args, function(data){
                    html = compiledTemplate(data);
                    $(that.container).html(html);
                    if(typeof cb === "function")
                    {
                        cb();
                    }
                });
            }
            else
            {
                html = compiledTemplate({});
                $(that.container).html(html);
                if(typeof cb === "function")
                {
                    cb();
                }
            }
        });
    };

    return View;
});