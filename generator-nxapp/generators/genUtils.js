(function () {
    'use strict';

    var fs = require('fs-extra'),
        wiring = require('html-wiring');

    var getBaseDir = function () {
        return process.cwd().split("/").pop() === "app" ? "" : "app/";
    };

    var appExists = function () {
        return fs.existsSync(getBaseDir().concat('scripts/app.js'));
    };

    var checkApp = function () {
        if (!appExists()) {
            throw new Error("App is not defined. Before run 'yo nx-app' to create a new app.");
        }
    };

    var adicionarScriptAoIndex = function (path) {
        var script = '\t<script src="'.concat(path).concat('"></script>\r\n');
        wiring.appendToFile(getBaseDir().concat('index.html'), 'html', script);
    };

    module.exports = {
        appExists: appExists,
        getBaseDir: getBaseDir,
        checkApp: checkApp,
        adicionarScriptAoIndex: adicionarScriptAoIndex
    };
})();