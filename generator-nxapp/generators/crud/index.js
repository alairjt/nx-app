(function () {
    'use strict';

    var yeoman = require('yeoman-generator'),
            nxUtils = require('nx-utils'),
            lodash = require('lodash'),
            underscore = require('underscore.string'),
            utils = require('./utils.js'),
            genUtils = require('../genUtils.js'),
            strUtils = require('../strUtils.js'),
            promptField = require('./prompts/field.js'),
            promptCrud = require('./prompts/crud.js'),
            promptFim = require('./prompts/finalizar.js'),
            request = require('request'),
            fields = [];

    module.exports = yeoman.generators.Base.extend({
        constructor: function () {
            var self = this;
            yeoman.generators.Base.apply(self, arguments);

            self.option('swagger');
            self.option('path');

            loadFromSwagger(self);

            genUtils.checkApp();
        },
        prompting: function () {
            var self = this,
                    done = self.async();

            this.log(nxUtils.nexxSay("Crudis Generator"));

            var askFim = function () {
                self.prompt(promptFim.prompts, function (props) {
                    utils.processarRetornoPrompt(props.finalizar, done, askField);
                }.bind(self));
            };

            var askField = function () {
                self.prompt(promptField.prompts, function (props) {
                    fields.push({
                        nome: props.nome, tipo: props.tipo, telas: props.telas,
                        label: props.label, comboboxDataFromService: props.comboboxDataFromService,
                        comboboxService: props.comboboxService, comboboxData: utils.efetuarParseComboboxData(props.comboboxData),
                        comboboxRecursoExistente: props.comboboxRecursoExistente
                    });

                    utils.processarRetornoPrompt(props.adicionarOutro, askField, askFim);
                }.bind(self));
            };

            var ask = function () {
                self.prompt(promptCrud.prompts(self), function (props) {
                    self.attrs = props;
                    self.crudName = props.crudName;
                    self.menu = props.menu.toLowerCase();
                    self.servico = props.servico || self.servico;
                    self.recurso = props.recurso || self.path;
                    self.campoGrupo = props.campoGrupo;
                    self.campoGrupoDetalhes = props.campoGrupoDetalhes;
                    self.campoGrupoTotal = props.campoGrupoTotal;

                    if (fields.length === 0) {
                        askField();
                    } else {
                        utils.processarRetornoPrompt(false, false, askFim);
                    }
                }.bind(self));
            };

            ask();
        },
        renderControllerFiles: function () {
            var self = this;

            self.ld = lodash;
            self.uc = underscore;
            self.capitalize = strUtils.capitalize;
            self.obterInputPorTipo = utils.obterInputPorTipo;
            self.getDisplayField = utils.getDisplayField;
            self.fields = fields;
            self.showFormulario = utils.hasFieldFormulario(self.fields);
            self.hasImageField = utils.hasImageField(self.fields);

            for (var key in self.fields) {
                if (self.fields[key].comboboxRecursoExistente === false) {
                    self.field = self.fields[key];
                    var pathResource = self.crudName.toLowerCase().concat('/').concat(self.capitalize(self.field.nome)).concat('.js');
                    self.template('_.resource_field.js', pathResource);
                    genUtils.adicionarScriptAoIndex(pathResource);
                    self.field.comboboxService = self.capitalize(self.field.nome);
                }
            }

            var gerarTemplatesCrud = function (crudName, tipoController) {
                var controllerType = tipoController === 'consulta' ? '' :  'Form';
                var viewType = tipoController === 'consulta' ? '' :  '-form';
                var nomeController = self.capitalize(crudName).concat(controllerType).concat('Controller');
                var pathController = crudName.toLowerCase().concat('/').concat(nomeController).concat('.js');
                var pathControllerTest = '../test/spec/'.concat(crudName.toLowerCase()).concat('/').concat(nomeController).concat('Test.js');
                var pathView = crudName.toLowerCase().concat('/').concat(crudName.toLowerCase()).concat(viewType).concat('.tpl.html');

                if (self.attrs.tipoVisualizacao === 'Simple') {
                    self.template('_.'.concat(tipoController).concat('.view.html'), genUtils.getBaseDir() + pathView);
                } else {
                    self.template('_.'.concat(tipoController).concat('.agrupada.view.html'), genUtils.getBaseDir() + pathView);
                }
                self.template('_.'.concat(tipoController).concat('.controller.js'), genUtils.getBaseDir() + pathController);
                self.template('_.'.concat(tipoController).concat('.controller.test.js'), genUtils.getBaseDir() + pathControllerTest);

                genUtils.adicionarScriptAoIndex(pathController);

                return {
                    nomeController: nomeController,
                    pathController: pathController,
                    pathView: pathView
                };
            };

            var consultaController = gerarTemplatesCrud(self.crudName, 'consulta');
            self.pathConsultaView = consultaController.pathView;
            self.nomeConsultaController = consultaController.nomeController;

            if (self.showFormulario) {
                var formularioController = gerarTemplatesCrud(self.crudName, 'formulario');
                self.pathFormularioView = formularioController.pathView;
                self.nomeFormularioController = formularioController.nomeController;
            }

            var gerarTemplateBasico = function (template, crudName, endName) {
                var pathService = crudName.toLowerCase().concat('/').concat(self.capitalize(self.crudName).concat(endName));
                self.template(template, genUtils.getBaseDir() + pathService);
                genUtils.adicionarScriptAoIndex(pathService);
            };

            gerarTemplateBasico('_.service.js', self.crudName, 'Service.js');
            gerarTemplateBasico('_.resource.js', self.crudName, '.js');
            gerarTemplateBasico('_.route.config.js', self.crudName, 'Config.js');

            if (self.attrs.createMenu) {
                var pathMenuConfig = "route/" + self.attrs.menu + "Config.js";
                self.template('_.menu.config.js', genUtils.getBaseDir() + pathMenuConfig);
                genUtils.adicionarScriptAoIndex(pathMenuConfig);
            }
        }
    });

    var createFieldDefault = function (name, propertie) {
        return {
            "nome": name,
            "tipo": strUtils.capitalize(propertie.type),
            "telas": ["consulta", "formulario"],
            "label": strUtils.capitalize(name)
        };
    };

    var loadFromSwagger = function (self) {
        if (typeof self.options.swagger === "string") {
            request(self.options.swagger, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var appSwagger = JSON.parse(body);

                    self.servico = strUtils.camelize(appSwagger.basePath, true);
                    self.path = self.options.path;
                    var pathApp = appSwagger.paths["/".concat(self.path)];

                    if (typeof pathApp !== "object") {
                        throw new Error("Path not exists: ".concat(self.path));
                    }

                    var pathAppDefinition = pathApp.get.responses['200'].schema['$ref'].split("/").pop();
                    var pathProperties = appSwagger.definitions[pathAppDefinition].properties;

                    for (var key in pathProperties) {
                        fields.push(createFieldDefault(key, pathProperties[key]));
                    }
                }
            });
        }
    };
})();
