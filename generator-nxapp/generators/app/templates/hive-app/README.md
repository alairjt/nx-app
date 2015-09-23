<%=props.appName%>
=================

1) Add following app configs in 'constants/HiveCommon.js' on HiveCommon project.

    <%=strUtils.decapitalize(props.appName)%>: {name: '<%=props.appName.toUpperCase() %>', baseUrl: '/<%=props.appName%>/', title: '<%=props.appName%>', class: "glyphicon glyphicon-question-sign", parent: hiveWeb}

2) Uncomment provider 'appConfig' at file app.js.


3) With local libraries
    3.1) UNCOMMENT at file index.html

        <!-- Liberar para rodar local
        <link rel="stylesheet" href="/NexxeraStyles/designComponents/stylesheet.css">
        -->

        <!--  Liberar para rodar local
        <script src="/NexxeraComponents/scripts-nexxera.js"></script>
        <script src="/HiveCommon/scripts-commons.js"></script>
        -->

    3.2) COMMENT at file index.html

        <link rel="stylesheet" href="https://aenhive-dev.nexxera.com/Library/designComponents-1.0.1/stylesheet.min.css">

        <script src="https://aenhive-dev.nexxera.com/Library/nexxeraComponents-1.2.0/scripts-nexxera.js"></script>
        <script src="https://aenhive-dev.nexxera.com/Library/hivecommon-1.0.2/scripts-commons.js"></script>