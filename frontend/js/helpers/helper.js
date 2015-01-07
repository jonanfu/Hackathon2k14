define([], function () {
    'use strict';

    function Helper(){};

    Helper.prototype.ticksToDateString = function(date)
    {
        var d = new Date(date);
        return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    };	

    Helper.prototype.shortContent = function(content)
    {
        if (content.length > 1000){
            var c = content.substr(0, 1000);
            // Cortamos hasta la última palabra, sin cortar palabras por la mitad
            c = c.substr(0, c.lastIndexOf(" "));
            return c + "...";
        }else{
            return content;
        }
    };

    return new Helper();
});