
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeroesController', HeroesController);

    HeroesController.$inject = ['dataPrepService'];

    function HeroesController(dataPrepService) {
        var vm = this;
        vm.heroes = dataPrepService.heroes;

        activate();

        function activate() {
            // moved to route resolver
            // return getHeroes()
            //     .then(function () {
            //         // console.log('Got heroes!');
            //     });
        }

        // moved to route resolver
        // function getHeroes() {
        //     return dataService.getHeroes()
        //         .then(function (data) {
        //             vm.heroes = data;
        //             return vm.heroes;
        //         });
        // }
    }
})();
