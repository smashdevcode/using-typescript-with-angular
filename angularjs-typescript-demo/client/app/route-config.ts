
namespace App {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider: angular.route.IRouteProvider) {
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
    function dataPrepService(dataService: App.Services.IDataService) {
        return dataService.getHeroes();
    }
}
