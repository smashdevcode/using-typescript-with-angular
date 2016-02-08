
(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$q'];

    function dataService($q) {
        var heroesData = getHeroesData(),
            service = {
                getHeroes: getHeroes
            };

        return service;

        function getHeroes() {
            return $q.resolve(heroesData);
        }

        function getHeroesData() {
            return [
                { name: 'Captain America' },
                { name: 'Iron Man' },
                { name: 'War Machine' },
                { name: 'Ant-Man' }
            ];
        }
    }
})();
