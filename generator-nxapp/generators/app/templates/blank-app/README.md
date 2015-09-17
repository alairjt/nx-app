<%=props.appName%>
=================

1) Add following app configs in 'constants/HiveCommon.js' on HiveCommon project.

    <%=strUtils.decapitalize(props.appName)%>: {name: '<%=props.appName.toUpperCase() %>', baseUrl: '/<%=props.appName%>/', title: '<%=props.appName%>', class: "glyphicon glyphicon-question-sign", parent: hiveWeb}

2) Uncomment provider 'appConfig' at file app.js.
