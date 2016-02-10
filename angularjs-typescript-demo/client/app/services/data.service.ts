
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

    class DataService implements IDataService {
        private heroesData: IHero[];

        static $inject = ['$q'];

        constructor(private $q: ng.IQService) {
            this.heroesData = this.getHeroesData();
        }

        getHeroes() {
            return this.$q.resolve({ heroes: this.heroesData });
        }

        addHero(hero: IHero) {
            this.heroesData.push(hero);
            return this.$q.resolve();
        }

        private getHeroesData(): IHero[] {
            return [
                { name: 'Captain America', team: 'Blue' },
                { name: 'Iron Man', team: 'Red' },
                { name: 'War Machine', team: 'Red' },
                { name: 'Ant-Man', team: 'Blue' }
            ];
        }
    }

    angular
        .module('app')
        .service('dataService', DataService);
}
