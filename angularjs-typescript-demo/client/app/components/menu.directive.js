var App;
(function (App) {
    var Components;
    (function (Components) {
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
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
