(function () {

    'use strict';

    var yeoman = require('yeoman-generator'),
        genUtils = require('../genUtils.js'),
        strUtils = require('../strUtils.js');

    module.exports = yeoman.generators.Base.extend({
        constructor: function () {
            yeoman.generators.Base.apply(this, arguments);

            this.argument('menuName', {type: String, required: true});

            genUtils.checkApp();
        },
        execute: function () {
            this.capitalize = strUtils.capitalize;
            this.menu = this.menuName;
            var pathMenuConfig = "route/" + this.menu + "Config.js";
            this.template('_.menu.config.js', genUtils.getBaseDir() + pathMenuConfig);
            genUtils.adicionarScriptAoIndex(pathMenuConfig);
        }
    });
}());