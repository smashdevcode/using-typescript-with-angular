
(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HeroesController',
                controllerAs: 'vm',
                templateUrl: 'heroes/heroes.html',
                resolve: {
                    dataPrepService: dataPrepService
                }
            })
            .when('/heroes/add', {
                controller: 'HeroDetailController',
                controllerAs: 'vm',
                templateUrl: 'heroes/hero-detail.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    dataPrepService.$inject = ['dataService'];
    function dataPrepService(dataService) {
        return dataService.getHeroes();
    }
})();
