define([ 'bootstrap', 'jquery' ], function(){
    "use strict";

    var App = function(config){
        this.controllers = config.controllers;
    };

    App.prototype.onHashChange = function(hash){
        var that = this, comp, controller, action, args, i;

        if(hash[hash.length -1] === "/"){
            hash = hash.substring(0, hash.length - 1);
        }
        comp = hash.replace("#",'').split('/');
        controller = comp[0] || "home";
        action = comp[1] || "index";

        args = [];
        for(i = 2; i < comp.length; i++)
        {
            args.push(comp[i]);
        }

        if(that.controllers[controller] === null || that.controllers[controller] === undefined) {
            console.log("ERROR: controller not found: " + controller);
        }
        else{
            if(that.controllers[controller][action] === null || that.controllers[controller][action] === undefined){
                console.log("ERROR: action not found in controller: " + controller + " - " + action);
            }
            else{
                that.controllers[controller][action](args);
            }
        }
    };

    App.prototype.GetHash = function(){
        return window.location.hash;
    };

    App.prototype.initialize = function(){
        var that = this, hash;
        $(window).on('hashchange', function(){
            var hash = that.GetHash();
            that.onHashChange(hash);
        });
        $(window).trigger('hashchange');
    };

    return App;
});