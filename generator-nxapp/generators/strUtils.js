(function () {
    'use strict';

    var underscore = require('underscore.string');
        
    var capitalize = function (string) {
        var string = string || "";
        return underscore.capitalize(string.toLowerCase());
    };

    module.exports = {
        capitalize: capitalize
    };
})();