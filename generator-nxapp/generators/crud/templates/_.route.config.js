(function () {
    "use strict";

    angular.module('nxApp').config(['$stateProvider', function ($stateProvider) {
        $stateProvider
                .state('home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>', {
                    url: "<%= crudName.toLowerCase() %>",
                    views: {
                        'content@': {
                            templateUrl: "<%= pathConsultaView %>",
                            controller: "<%= nomeConsultaController%>",
                            controllerAs: 'ctrl'
                        },
                        'name@': {
                            template: "<%= capitalize(crudName) %>"
                        }
                    },
                    data: {
                        displayMenu: true,
                        displayName: '<%= capitalize(crudName) %>',
                        operacoes: []
                    }
                })
                <% if (showFormulario) { %>
                    .state('home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>.novo', {
                        url: "novo",
                        transition: "home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>",
                        views: {
                            'content@': {
                                templateUrl: "<%= pathFormularioView %>",
                                controller: "<%= nomeFormularioController %>",
                                controllerAs: 'ctrl'
                            },
                            'name@': {
                                template: "Novo"
                            }
                        },
                        data: {
                            displayMenu: false,
                            displayName: 'Novo',
                            operacoes: []
                        }
                    })
                    .state('home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>.editar', {
                        url: "editar/:id",
                        transition: "home.<%= menu.toLowerCase() %>.<%= crudName.toLowerCase() %>",
                        views: {
                            'content@': {
                                templateUrl: "<%= pathFormularioView %>",
                                controller: "<%= nomeFormularioController %>",
                                controllerAs: 'ctrl'
                            },
                            'name@': {
                                template: "Editar"
                            }
                        },
                        data: {
                            displayMenu: false,
                            displayName: 'Editar',
                            operacoes: []
                        }
                    })
                <% } %>
                ;
    }]);
})();
