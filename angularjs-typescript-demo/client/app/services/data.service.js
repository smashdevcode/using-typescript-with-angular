var App;
(function (App) {
    var Services;
    (function (Services) {
        'use strict';
        var DataService = (function () {
            function DataService($q) {
                this.$q = $q;
                this.heroesData = this.getHeroesData();
            }
            DataService.prototype.getHeroes = function () {
                return this.$q.resolve({ heroes: this.heroesData });
            };
            DataService.prototype.addHero = function (hero) {
                this.heroesData.push(hero);
                return this.$q.resolve();
            };
            DataService.prototype.getHeroesData = function () {
                return [
                    { name: 'Captain America', team: 'Blue' },
                    { name: 'Iron Man', team: 'Red' },
                    { name: 'War Machine', team: 'Red' },
                    { name: 'Ant-Man', team: 'Blue' }
                ];
            };
            DataService.$inject = ['$q'];
            return DataService;
        }());
        angular
            .module('app')
            .service('dataService', DataService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
