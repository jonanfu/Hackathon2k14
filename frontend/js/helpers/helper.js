define([], function () {
    'use strict';

    function Helper(){};

    Helper.prototype.ticksToDateString = function(date)
    {
        var d = new Date(date);
        return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    };

    return new Helper();
});