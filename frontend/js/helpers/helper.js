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
    	return content.substr(0, 50);
    };

    return new Helper();
});