
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeroesController', HeroesController);

    HeroesController.$inject = ['dataService'];

    function HeroesController(dataService) {
        var vm = this;
        vm.heroes = [];

        activate();

        function activate() {
            return getHeroes()
                .then(function () {
                    // console.log('Got heroes!');
                });
        }

        function getHeroes() {
            return dataService.getHeroes()
                .then(function (data) {
                    vm.heroes = data;
                    return vm.heroes;
                });
        }
    }
})();
