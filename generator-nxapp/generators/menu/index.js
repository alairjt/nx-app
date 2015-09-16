'use strict';
var yeoman = require('yeoman-generator');
var utils = require('nx-utils');
var shell = require('shelljs');
var menuUtils = require('../menuUtils.js');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('menuName', {type: String, required: true});
    },
    execute: function () {
        if (menuUtils.menuExists(this.menuName)) {
            this.log("Menu already exists");
            return;
        }

        menuUtils.addMenu(this.menuName);
        this.log("Menu created");
        this.log("Add following code in app/route.js");
        this.log(".state('home." + this.menuName.toLowerCase() + "', { \n" +
                "     data: { \n" +
                "     hideMessagesForHTTPCodes : [], \n" +
                "     displayName: '" + this.menuName.toLowerCase() + "' \n" +
                "   } \n" +
                " })");
    }
});
