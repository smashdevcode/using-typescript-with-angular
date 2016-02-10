
# AngularJS Application Migration to TypeScript

## tsconfig

To start, we need to add a `tsconfig.json` file to the root of the project.

```
{
    "version": "1.7.5",
    "compilerOptions": {
        "target": "es5",
        "declaration": false,
        "noImplicitAny": false,
        "removeComments": true,
        "noLib": false,
        "sourceMap": false,
        "module": "system",
        "experimentalDecorators": true
    },
    "filesGlob": [
        "./**/*.ts",
        "!./node_modules/**/*.ts"
    ],
    "files": [
    ],
    "atom": {
        "rewriteTsconfig": true
    }
}
```

You can learn more about `tsconfig.json` at the TypeScript Wiki.

[https://github.com/Microsoft/TypeScript/wiki/tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)

## Convert JavaScript Files

To get started with TypeScript, we don't need to convert every JavaScript file in our project. Instead, we can start by converting just one (or two) files. Just change the file extension from `.js` to `.ts`. For this example, let's start with the `./client/app/services/data.service.js` file.

Unfortunately, TypeScript doesn't know anything about the `angular` global variable. This can be fixed by adding a type definition file for AngularJS to our project.

## Add Angular Typings

`Typings` is the new TypeScript definition manager. It can install definition files from GitHub, NPM, Bower, HTTP, and local files.

[https://github.com/typings/typings](https://github.com/typings/typings)

Start by installing the definition manager.

```
npm install -g typings
```

You can search for typings using the `search` command. Notice the inclusion of the `ambient` switch. This is necessary in order to include DefinitelyTyped in the lookup.

```
typings search angular --ambient
```

To install a definition file use the `install` command. The `save` switch will persist the selection in `typings.json`.

```
typings install angular --ambient --save
```

Note that typings will install for both `browser` and `main`. You only need one of those, so be sure to exclude the one that you don't need. Since I'm using `atom-typescript`, I'll just update my files glob.

```
"filesGlob": [
    "./**/*.ts",
    "!./node_modules/**/*.ts",
    "!./typings/main.d.ts",
    "!./typings/main/**/*.d.ts"
],
```

Sometimes dependencies won't get installed. If that happens for `jQuery`, then manually install the necessary definition.

```
typings install jquery --ambient --save
```

Now our app should be compiling. If we inspect the `angular` variable, we can see the available type information.

## Add Types

### ng.IQService Interface

Our data service works "as is", but aside from the Angular global object, a fair share of our types are currently `any`. We can do improve that situation by adding type information to our code.

For instance, if we hover over the `$q.resolve` method, we don't get specific type information. If we update the the `$q` parameter so that is of type `: ng.IQService`, then we get type information about `$q`.

### IHero Interface

We can also be more explicit about our "hero" objects and the data that they contain. To do that, let's add the following interface.

```
interface IHero {
    name: string;
    team: string;
}
```

Then add the interface to the `addHero` and `getHeroesData` functions.

```
function addHero(hero: IHero) {
    heroesData.push(hero);
    return $q.resolve();
}

function getHeroesData(): IHero[] {
    return [
        { name: 'Captain America', team: 'Blue' },
        { name: 'Iron Man', team: 'Red' },
        { name: 'War Machine', team: 'Red' },
        { name: 'Ant-Man', team: 'Blue' }
    ];
}
```

## Converting Controllers to Classes

Let's convert our `HeroDetailController` to be a class. First off, we'll change the file extension to `.ts`. Then we'll add the `ng.ILocationService` type to the `$location` parameter.

Our `dataService` parameter does not have type information. To fix this, let's add an `IDataService` interface.

```
interface IDataService {
    getHeroes(): ng.IPromise<{ heroes: IHero[] }>;
    addHero(hero: IHero): ng.IPromise<void>;
}
```

Then update the `service` variable to be of type `IDataService`. Now we can update the `dataService` parameter in our `HeroDetailController` to also be of type `IDataService`.

We immediately run into a problem, but the `HeroDetailController` function cannot see the interfaces that we defined in the `dataService` IIFE (Immediately Invoked Function Expression). Using proper namespaces would resolve this issue, but let's hold off on that until later.

Now, let's replace the HeroDetailController function with this class.

```
class HeroDetailController {
    name: string;
    team: string;

    constructor(private $location: ng.ILocationService, private dataService: IDataService) {
        this.name = '';
        this.team = 'Blue';
    }

    addHero() {
        return this.dataService.addHero({
                name: this.name,
                team: this.team
            }).then(function () {
                this.$location.path('/');
            });
    }
}

```

Our app will compile, but won't bootstrap properly. The problem is due to attempting to set the `$inject` property on a variable that doesn't have a value assigned to it yet. An easy fix is to move this line to below the class definition.

```
HeroDetailController.$inject = ['$location', 'dataService'];
```

Or we can add a static field to our class.

```
static $inject = ['$location', 'dataService'];
```

Now our app bootstraps, but if we browse to the "Add Hero" view, we get another runtime error. The problem is that converting to a class has changed our named function to a function that is assigned to variable. The variable declaration is hoisted, but doesn't get assigned a value until after the call to the `angular.module.controller` method. To fix this issue, let's just move the call to `angular.module.controller` to below the class definition.

Now that we have two TypeScript files, we can play around with navigating our project via references.

## Template Strings

If we convert our menu directive to TypeScript, then we can use template strings to improve the formatting of our inline HTML template.

```
function menu() {
    var template = `
        <ul>
            <li><a href="#/">Heroes</a></li>
            <li><a href="#/heroes/add">Add Hero</a></li>
        </ul>
    `;
    return {
        template: template
    };
}
```

## Namespaces

We can replace all of our IIFEs with TypeScript namespaces.

```
namespace App.Heroes {
    ...
}
```

Once we have our namespaces in place, we can then move the data service interfaces out of the global namespace. When we do that, we need to `export` the IDataService interface.

```
export interface IDataService {
    getHeroes(): ng.IPromise<{ heroes: IHero[] }>;
    addHero(hero: IHero): ng.IPromise<void>;
}
```

Then in the HeroDetailController, we need to add the namespace to the IDataService parameter type.

```
constructor(private $location: ng.ILocationService,
        private dataService: App.Services.IDataService) {
    this.name = '';
    this.team = 'Blue';
}
```

## Service Classes

We can also convert our data service into a TypeScript class. When we do that, we'll need to switch to using an AngularJS `service` instead of a `factory`. This is because an AngularJS `factory` just holds a reference to the object that our function creates and returns whereas a `service` expects a constructor function so that it can use the `new` keyword to instantiate the object itself.

Here's what our data service class looks like.

```
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
```

## Next Steps

We're currently relying upon the Atom TypeScript extension to compile our TypeScript code. A better approach would be to have our Gulp build process lint and compile our TypeScript code. Luckily, this is easy to do using the `gulp-typescript` Gulp plug-in.

[https://www.npmjs.com/package/gulp-typescript](https://www.npmjs.com/package/gulp-typescript)

We can lint our TypeScript using TSLint.

[http://palantir.github.io/tslint/](http://palantir.github.io/tslint/)

There's also a Gulp plug-in available.

[https://www.npmjs.com/package/gulp-tslint](https://www.npmjs.com/package/gulp-tslint)
