
namespace App.Heroes {
    'use strict';

    class HeroDetailController {
        name: string;
        team: string;

        static $inject = ['$location', 'dataService'];

        constructor(private $location: ng.ILocationService,
                private dataService: App.Services.IDataService) {
            this.name = '';
            this.team = 'Blue';
        }

        addHero() {
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
}
