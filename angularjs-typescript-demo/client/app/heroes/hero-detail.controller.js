var App;
(function (App) {
    var Heroes;
    (function (Heroes) {
        'use strict';
        var HeroDetailController = (function () {
            function HeroDetailController($location, dataService) {
                this.$location = $location;
                this.dataService = dataService;
                this.name = '';
                this.team = 'Blue';
            }
            HeroDetailController.prototype.addHero = function () {
                var _this = this;
                return this.dataService.addHero({
                    name: this.name,
                    team: this.team
                }).then(function () {
                    _this.$location.path('/');
                });
            };
            HeroDetailController.$inject = ['$location', 'dataService'];
            return HeroDetailController;
        }());
        angular
            .module('app')
            .controller('HeroDetailController', HeroDetailController);
    })(Heroes = App.Heroes || (App.Heroes = {}));
})(App || (App = {}));
