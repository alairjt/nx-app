'use strict';
var yeoman = require('yeoman-generator'),
    utils = require('nx-utils'),
    strUtils = require('../strUtils'),
    shell = require('shelljs'),
    genUtils = require('../genUtils.js');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        
        this.option('install');
        this.option('noinstall');
        this.argument('appName', { type: String, required: false });
        
        if (genUtils.appExists()) {
            throw new Error("App already exists");
        }
    },
    prompting: function () {
        var self = this;
        var done = self.async();

        this.log(utils.nexxSay("Hive App Generator"));

        var prompts = [{
                when: function () {
                    return typeof self.appName === "undefined";
                },
                type: 'text',
                name: 'appName',
                message: 'App name',
                default: process.cwd().split("\\").pop()
            }, {
                when: function () {
                    return !self.options.install && !self.options.noinstall;
                },
                type: 'confirm',
                name: 'installDependencies',
                message: 'Install dependencies?',
                default: true
            }];

        self.prompt(prompts, function (props) {
            self.props = props;
            self.props.appName = strUtils.replaceAll((self.props.appName || self.appName), " ", "");
            self.strUtils = strUtils;

            done();
        }.bind(self));
    },
    renderControllerFiles: function () {
        this.directory(this.templatePath('hive-app'), this.destinationPath());
    },
    install: function () {
        if (this.props.installDependencies || this.options.install) {
            shell.cd('config');
            this.installDependencies();
        }
    }
});
