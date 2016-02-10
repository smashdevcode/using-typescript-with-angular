var App;
(function (App) {
    var Heroes;
    (function (Heroes) {
        'use strict';
        angular
            .module('app')
            .controller('HeroesController', HeroesController);
        HeroesController.$inject = ['dataPrepService'];
        function HeroesController(dataPrepService) {
            var vm = this;
            vm.heroes = dataPrepService.heroes;
        }
    })(Heroes = App.Heroes || (App.Heroes = {}));
})(App || (App = {}));
