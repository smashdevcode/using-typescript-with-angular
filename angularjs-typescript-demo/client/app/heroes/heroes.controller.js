var App;
(function (App) {
    var Heroes;
    (function (Heroes) {
        'use strict';
        var HeroesController = (function () {
            function HeroesController(dataPrepService) {
                this.heroes = dataPrepService.heroes;
            }
            HeroesController.$inject = ['dataPrepService'];
            return HeroesController;
        }());
        angular
            .module('app')
            .controller('HeroesController', HeroesController);
    })(Heroes = App.Heroes || (App.Heroes = {}));
})(App || (App = {}));
