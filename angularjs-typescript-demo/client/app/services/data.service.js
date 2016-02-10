(function () {
    'use strict';
    angular
        .module('app')
        .factory('dataService', dataService);
    dataService.$inject = ['$q'];
    function dataService($q) {
        var heroesData = getHeroesData(), service = {
            getHeroes: getHeroes,
            addHero: addHero
        };
        return service;
        function getHeroes() {
            return $q.resolve({ heroes: heroesData });
        }
        function addHero(hero) {
            heroesData.push(hero);
            return $q.resolve();
        }
        function getHeroesData() {
            return [
                { name: 'Captain America', team: 'Blue' },
                { name: 'Iron Man', team: 'Red' },
                { name: 'War Machine', team: 'Red' },
                { name: 'Ant-Man', team: 'Blue' }
            ];
        }
    }
})();
