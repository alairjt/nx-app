(function () {
    'use strict';

    angular.module('nxApp')

    .factory('MenuFactory', MenuFactory);

    MenuFactory.$inject = ['$state'];

    function MenuFactory($state) {
        var STATE_SEPARATOR = '.';
        var sectionFactory = {
            sections: [],
            get: get,
            getStates: getStates,
            addSection: addSection
        };

        addByRoute();

        return sectionFactory;

        // ---------------------- //

        function getStates() {
            return $state.get();
        }

        function get(state) {
            if (typeof state === 'string') {
                return getSection(state, sectionFactory.sections);
            }
            return sectionFactory.sections;
        }

        function getSection(state, sections) {
            var section;
            for (var key in sections) {
                if (sections[key].state === state) {
                    section = sections[key];
                    break;
                }
                section = getSection(state, sections[key].pages);
                if (section && section.state) {
                    break;
                }
            }
            return section || {};
        }

        function addByRoute() {
            angular.forEach(sectionFactory.getStates(), function (section) {
                if (section.data && section.data.displayMenu) {
                    sectionFactory.addSection(section);
                }
            });
        }

        function createSection(section) {
            return {
                'name': section.data ? section.data.displayName : '-',
                'state': section.name,
                'icon': section.data ? section.data.icon : '',
                'id': section.name.replace(/\./g, '-'),
                'type': 'link',
                'pages': []
            };
        }

        function addSection(section) {
            var newSection = createSection(section);

            if (!hasParent(newSection)) {
                sectionFactory.sections.push(newSection);
                return;
            }

            var parentState, parentSection;

            parentState = newSection.state.split(STATE_SEPARATOR);
            parentState.pop();
            parentSection = getSection(parentState.join(STATE_SEPARATOR), sectionFactory.sections);

            if (parentSection.pages) {
                parentSection.type = 'toggle';
                parentSection.pages.push(newSection);
            }

            return true;
        }

        function hasParent(section) {
            return section.state.split(STATE_SEPARATOR).length > 2;
        }
    }
})();
