
(function () {
    'use strict';

    angular
        .module('app')
        .directive('simpleDirective', simpleDirective);

    function simpleDirective() {
        return {
            template: 'This is my simple directive!'
        };
    }
})();
