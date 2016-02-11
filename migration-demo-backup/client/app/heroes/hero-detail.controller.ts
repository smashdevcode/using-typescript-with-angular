
(function () {
    'use strict';

    interface IHero {
        name: string;
        team: string;
    }

    interface IDataService {
        getHeroes(): ng.IPromise<{ heroes: IHero[] }>;
        addHero(hero: IHero): ng.IPromise<void>;
    }

    class HeroDetailController {
        name: string;
        team: string;

        static $inject = ['$location', 'dataService'];

        constructor(private $location: ng.ILocationService, private dataService: IDataService) {
            this.name = '';
            this.team = 'Blue';
        }

        addHero = () => {
            return this.dataService.addHero({
                    name: this.name,
                    team: this.team
                }).then(() => {
                    this.$location.path('/');
                });
        }
    }

    angular
        .module('app')
        .controller('HeroDetailController', HeroDetailController);
})();
