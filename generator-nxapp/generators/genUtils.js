(function () {
    'use strict';

    var fs = require('fs-extra');

    var getBaseDir = function () {
        return process.cwd().split("\\").pop() === "src" ? "" : "src/";
    };

    var appExists = function () {
        return fs.existsSync(getBaseDir().concat('app/app.js'));
    };
    
    var checkApp = function () {
        if (!appExists()) {
            throw new Error("App is not defined. Before run 'yo nx-app' to create a new app.");
        }
    };

    module.exports = {
        appExists: appExists,
        getBaseDir: getBaseDir,
        checkApp: checkApp
    };
})();