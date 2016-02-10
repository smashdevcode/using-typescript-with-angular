
namespace App.Services {
    'use strict';

    export interface IDataService {
        getHeroes(): ng.IPromise<{ heroes: IHero[] }>;
        addHero(hero: IHero): ng.IPromise<void>;
    }

    export interface IHero {
        name: string;
        team: string;
    }

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$q'];

    function dataService($q: ng.IQService) {
        var heroesData = getHeroesData(),
            service: IDataService = {
                getHeroes: getHeroes,
                addHero: addHero
            };

        return service;

        function getHeroes() {
            return $q.resolve({ heroes: heroesData });
        }

        function addHero(hero: IHero) {
            heroesData.push(hero);
            return $q.resolve();
        }

        function getHeroesData(): IHero[] {
            return [
                { name: 'Captain America', team: 'Blue' },
                { name: 'Iron Man', team: 'Red' },
                { name: 'War Machine', team: 'Red' },
                { name: 'Ant-Man', team: 'Blue' }
            ];
        }
    }
}
