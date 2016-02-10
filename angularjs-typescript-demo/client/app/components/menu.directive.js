(function () {
    'use strict';
    angular
        .module('app')
        .directive('menu', menu);
    function menu() {
        var template = "\n            <ul>\n                <li><a href=\"#/\">Heroes</a></li>\n                <li><a href=\"#/heroes/add\">Add Hero</a></li>\n            </ul>\n        ";
        return {
            template: template
        };
    }
})();
