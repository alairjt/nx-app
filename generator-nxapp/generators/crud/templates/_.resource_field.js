(function () {
    'use strict';

    angular.module('nxApp').factory("<%=capitalize(field.nome) %>", ['nxResource', 'SERVICES', function (nxResource, SERVICES) {
        return nxResource(<%=field.comboboxService%>);
    }]);
})();