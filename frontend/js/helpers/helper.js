define([], function () {
    'use strict';

    function Helper(){};

    Helper.prototype.ticksToDateString = function(ticks)
    {
        var d = new Date(ticks);
        return d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
    };

    return new Helper();
});