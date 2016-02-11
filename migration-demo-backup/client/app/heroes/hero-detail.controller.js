(function () {
    'use strict';
    var HeroDetailController = (function () {
        function HeroDetailController($location, dataService) {
            var _this = this;
            this.$location = $location;
            this.dataService = dataService;
            this.addHero = function () {
                return _this.dataService.addHero({
                    name: _this.name,
                    team: _this.team
                }).then(function () {
                    _this.$location.path('/');
                });
            };
            this.name = '';
            this.team = 'Blue';
        }
        HeroDetailController.$inject = ['$location', 'dataService'];
        return HeroDetailController;
    }());
    angular
        .module('app')
        .controller('HeroDetailController', HeroDetailController);
})();
