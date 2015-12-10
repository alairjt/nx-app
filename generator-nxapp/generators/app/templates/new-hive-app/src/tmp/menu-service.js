(function() {

    'use strict';

    angular.module('nxApp')
        .factory('menu', [
            '$location',
            '$rootScope',
            function($location) {

                var sections = [{
                    name: 'Getting Started',
                    state: 'home',
                    type: 'link'
                }];

                sections.push({
                    name: 'Consulta',
                    type: 'toggle',
                    pages: [{
                        name: 'Banco',
                        type: 'link',
                        state: 'home.novo.bank',
                        icon: 'fa fa-group'
                    }]
                });

                sections.push({
                    name: 'Munchies',
                    type: 'toggle',
                    pages: [{
                        name: 'Cheetos',
                        type: 'link',
                        state: 'munchies.cheetos',
                        icon: 'fa fa-group'
                    }, {
                        name: 'Banana Chips',
                        state: 'munchies.bananachips',
                        type: 'link',
                        icon: 'fa fa-map-marker'
                    }, {
                        name: 'Donuts',
                        state: 'munchies.donuts',
                        type: 'link',
                        icon: 'fa fa-map-marker'
                    }]
                });

                var self = {
                    sections: sections,
                    toggleSelectSection: function(section) {
                        self.openedSection = (self.openedSection === section ? null : section);
                    },
                    isSectionSelected: function(section) {
                        return self.openedSection === section;
                    },
                    selectPage: function(section, page) {
                        if (page && page.url) {
                            $location.path(page.url);
                        }
                        self.currentSection = section;
                        self.currentPage = page;
                    }
                };

                return self;
            }
        ]);
})();
