
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeroDetailController', HeroDetailController);

    HeroDetailController.$inject = ['$location', 'dataService'];

    function HeroDetailController($location, dataService) {
        var vm = this;
        vm.name = '';
        vm.team = 'Blue';
        vm.addHero = addHero;

        function addHero() {
            return dataService.addHero({
                    name: vm.name,
                    team: vm.team
                }).then(function () {
                    $location.path('/');
                });
        }
    }
})();
