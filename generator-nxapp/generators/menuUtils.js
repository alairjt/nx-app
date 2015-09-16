(function () {
    'use strict';

    var wiring = require('html-wiring'),
            underscore = require('underscore.string');

    var capitalize = function (string) {
        var string = string || "";
        return underscore.capitalize(string.toLowerCase());
    };
    
    var getMenuFullPath = function () {
        var baseApp = process.cwd().split("\\").pop() === "src" ? "" : "src/";
        return baseApp + 'template/menu.json';
    };

    var createMenu = function (menuName) {
        return {
            "url": menuName.toLowerCase(),
            "nome": capitalize(menuName),
            "href": menuName.toLowerCase(),
            "id": menuName.toLowerCase(),
            "submenus": [
            ]
        };
    };
    
    var addMenu = function (menuName) {
        var menu = parserMenuJson();
        
        menu.menus.push(createMenu(menuName));
        
        wiring.writeFileFromString(JSON.stringify(menu), getMenuFullPath());
    };

    var createSubMenu = function (subMenuName, menu) {
        return {
            "nome": capitalize(subMenuName),
            "href": "home.".concat(menu.toLowerCase()).concat(".").concat(subMenuName.toLowerCase()),
            "id": menu.toLowerCase().concat("-").concat(subMenuName.toLowerCase())
        };
    };
    
    var menuExists = function (menuName) {
        var menu = parserMenuJson();
        var retorno = false;
        
        for (var key in menu.menus) {
            if (menu.menus[key].nome === capitalize(menuName)) {
                retorno = true;
                break;
            }
        }
        
        return retorno;
    };

    var addSubMenu = function (subMenuName, nomeMenu) {
        var menu = parserMenuJson();

        for (var i = 0; i < menu.menus.length; i++) {
            if (menu.menus[i].url && menu.menus[i].url.toLowerCase() === nomeMenu.toLowerCase()) {
                menu.menus[i].submenus.push(createSubMenu(subMenuName, nomeMenu));

                wiring.writeFileFromString(JSON.stringify(menu), getMenuFullPath());
                break;
            }
        }
    };

    var getMenus = function () {
        var menu = parserMenuJson();
        var menus = [];

        for (var i = 0; i < menu.menus.length; i++) {
            if (menu.menus[i].url) {
                menus.push(capitalize(menu.menus[i].url));
            }
        }

        return menus;
    };

    var parserMenuJson = function () {
        try {
            return JSON.parse(wiring.readFileAsString(getMenuFullPath()));
        } catch (e) {
            throw new Error("File not found: " + getMenuFullPath());
        }
    };

    module.exports = {
        addMenu: addMenu,
        addSubMenu: addSubMenu,
        getMenus: getMenus,
        createSubMenu: createSubMenu,
        parserMenuJson: parserMenuJson,
        menuExists: menuExists
    };
})();