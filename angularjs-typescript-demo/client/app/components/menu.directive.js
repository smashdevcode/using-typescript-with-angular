var App;
(function (App) {
    var Components;
    (function (Components) {
        'use strict';
        angular
            .module('app')
            .directive('menu', menu);
        function menu() {
            return {
                restrict: 'E',
                template: "\n                <ul>\n                    <li><a href=\"#/\">Heroes</a></li>\n                    <li><a href=\"#/heroes/add\">Add Hero</a></li>\n                </ul>\n            "
            };
        }
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
