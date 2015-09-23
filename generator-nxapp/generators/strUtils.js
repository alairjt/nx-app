(function () {
    'use strict';

    var underscore = require('underscore.string');
        
    var capitalize = function (string) {
        string = string || "";
        return underscore.capitalize(string.toLowerCase());
    };
    
    var decapitalize = function (string) {
        string = string || "";
        return underscore.decapitalize(string);
    };
    
    var replaceAll = function (string, find, replace) {
        string = string || "";
        return underscore.replaceAll(string, find, replace, true);
    };
    
    var camelize = function (string, decapitalize) {
        string = replaceAll(string, "/", "-");
        
        return underscore.camelize(string, decapitalize);
    };
    
    module.exports = {
        camelize: camelize,
        capitalize: capitalize,
        decapitalize: decapitalize,
        replaceAll: replaceAll
    };
})();