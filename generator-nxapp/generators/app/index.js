'use strict';
var yeoman = require('yeoman-generator');
var utils = require('nx-utils');
var shell = require('shelljs');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        
        this.option('install');
        this.option('noinstall'); //Todo: Aplicar
        this.argument('appName', { type: String, required: false });
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
                message: 'Nome da aplicação',
                default: process.cwd().split("\\").pop()
            }, {
                when: function () {
                    return !self.options.install;
                },
                type: 'confirm',
                name: 'installDependencies',
                message: 'Instalar dependencias?',
                default: true
            }];

        self.prompt(prompts, function (props) {
            self.props = props;
            self.props.appName = self.props.appName || self.appName;

            done();
        }.bind(self));
    },
    renderControllerFiles: function () {
        this.directory(this.templatePath('blank-app'), this.destinationPath());
    },
    install: function () {
        if (this.props.installDependencies || this.options.install) {
            shell.cd('config');
            this.installDependencies();
        }
    }
});
