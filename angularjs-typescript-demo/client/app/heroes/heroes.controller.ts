
namespace App.Heroes {
    'use strict';

    class HeroesController {
        heroes: App.Services.IHero[];

        static $inject = ['dataPrepService'];

        constructor(dataPrepService) {
            this.heroes = dataPrepService.heroes;
        }
    }

    angular
        .module('app')
        .controller('HeroesController', HeroesController);
}
