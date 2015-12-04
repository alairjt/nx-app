(function () {
    'use strict';

    angular.module('nxApp').factory("<%=capitalize(crudName) %>", <%=capitalize(crudName)%>);
    
    <%=capitalize(crudName)%>.$inject = ['$nxResource', 'ServicesRegister'];
        
    function <%=capitalize(crudName)%>($nxResource, ServicesRegister) {
        ServicesRegister.add('<%=servico.replace(/\//g,"_")%>Service', '<%=servico.toLowerCase()%>', '<%=servico.toLowerCase()%>');
        ServicesRegister.<%=servico.replace(/\//g,"_")%>Service.addResource('<%=recurso.toLowerCase()%>', '<%=recurso.toLowerCase()%>/:id');
        
        return $nxResource(ServicesRegister.<%=servico.replace(/\//g,"_")%>Service.<%=recurso.toLowerCase()%>.getFullPath());
    };
})();
