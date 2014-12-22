define([], function () {
    'use strict';

    var Model = function(config){
        this.endpoint = config.endpoint;
        this.formatter = config.formatter;
    };

    Model.prototype.ajaxHelper = function(type, data, cb){

        var serializedPublication, that = this;

        if(type !== "GET") {
            serializedPublication = JSON.stringify(data);
        }
        else
        {
            serializedPublication = data;
        }

        $.ajax({
            type: type,
            contentType : "application/json",
            url: that.endpoint,
            data: serializedPublication,
            success: function(data)
            {
                if(that.formatter != null){
                    data = that.formatter(data);
                }
                cb(data);
            },
            error : function(a,b,c)
            {
                console.log(a,b,c);
            }
        });
    };

    Model.prototype.get = function(data, cb){
        this.ajaxHelper("GET", data, cb);
    };

    Model.prototype.post = function(data, cb){
        this.ajaxHelper("POST", data, cb);
    };

    Model.prototype.put = function(data, cb){
        this.ajaxHelper("PUT", data, cb);
    };

    Model.prototype.delete = function(data, cb){
        this.ajaxHelper("DELETE", data, cb);
    };

    return Model;
});