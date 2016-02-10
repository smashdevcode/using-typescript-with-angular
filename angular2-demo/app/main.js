System.register(['angular2/platform/browser', './heroes.component'], function(exports_1) {
    var browser_1, heroes_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(heroes_component_1.HeroesComponent);
        }
    }
});
//# sourceMappingURL=main.js.map