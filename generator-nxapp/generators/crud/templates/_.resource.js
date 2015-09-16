(function () {
    'use strict';

    app.factory("<%=capitalize(crudName) %>", ['nxResource', 'SERVICES', function (nxResource, SERVICES) {

        var resource<%=capitalize(recurso.replace(/\//g,"_"))%> = {path: '<%=recurso.toLowerCase()%>/:id'};

        SERVICES.addResource(SERVICES.<%=servico%>, {resource<%=capitalize(recurso.replace(/\//g,"_"))%>: resource<%=capitalize(recurso.replace(/\//g,"_"))%>});

        return nxResource(SERVICES.<%=servico%>.resource<%=capitalize(recurso.replace(/\//g,"_"))%>);
    }]);
})();
