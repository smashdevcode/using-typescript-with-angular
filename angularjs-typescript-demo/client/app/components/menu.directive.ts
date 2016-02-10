
namespace App.Components {
    'use strict';

    angular
        .module('app')
        .directive('menu', menu);

    function menu() {
        var template = `
            <ul>
                <li><a href="#/">Heroes</a></li>
                <li><a href="#/heroes/add">Add Hero</a></li>
            </ul>
        `;
        return {
            template: template
        };
    }

}
