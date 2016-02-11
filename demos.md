
# Demos

## Language Overview

### Install Atom TypeScript Extension

See [https://atom.io/packages/atom-typescript](https://atom.io/packages/atom-typescript)

### Add tsconfig.json file

Add a `tsconfig.json` file to the root of your project.

```
{
    "version": "1.7.5",
    "compilerOptions": {
        "target": "es5",
        "declaration": false,
        "noImplicitAny": false,
        "removeComments": true,
        "noLib": false,
        "sourceMap": true,
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

### (Almost) Any Valid JavaScript is TypeScript

Since TypeScript is a superset of JavaScript we can use just about any valid JavaScript in our TypeScript files.

```
function add(number1, number2) {
    return number1 + number2;
}

var addResult = add(1, 2);
console.log(addResult);
```

1. Show that the compiled JavaScript is almost identical to the original TypeScript.
1. Hover over the `add` function to show that we're already getting additional tooling support.

### Optional Static Data Typing

1. Update the call to the `add` function to pass a bad value.
1. We can prevent this type of error by adding static data types to our parameters.
1. Show that the data types evaporate in the compiled JavaScript.
1. Remove the data types and show that the default data type is `any`.

### Type Inference

1. Show that the return data type is being inferred.
1. Show that TypeScript will also infer the data types for variable declarations that include assignments.

### Interfaces

Let's update our `add` function to accept an object literal. How do we ensure that we're getting an object that meets our expectations?

1. Show how we can declare the object inline.
1. Show how we can use an interface.
1. Show that we can't under or over supply object properties.
1. Show that our interface can have optional properties.

```
interface INumbers {
    number1: number;
    number2: number;
    number3?: number;
}

function add(obj: INumbers) {
    return obj.number1 + obj.number2 + (obj.number3 ? obj.number3 : 0);
}

var addResult = add({ number1: 1, number2: 2, number3: 3 });
console.log(addResult);
```

### Classes

1. Show that we can also use classes.
1. Our classes can also implement one or more interfaces.
1. Parameters can be set default values or made optional (but not both).
1. Classes can also have methods which can be public (default), private, or protected.

```
interface INumbers {
    number1: number;
    number2: number;
    number3?: number;
}

class Numbers implements INumbers {
    number1: number;
    number2: number;
    number3: number;

    constructor(number1: number, number2: number, number3: number = 0) {
        this.number1 = number1;
        this.number2 = number2;
        this.number3 = number3;
    }
}

function add(obj: INumbers) {
    return obj.number1 + obj.number2 + (obj.number3 ? obj.number3 : 0);
}

var numbers = new Numbers(1, 2, 3);
var addResult = add(numbers);
console.log(addResult);
```

### Namespaces

To keep our code from bleeding into the global namespace, we can wrap our code in a namespace.

### And More!

There's a whole bunch of stuff that we aren't covering here.

* Modules
* Decorators
* Async/Await
* Template Strings
* Let/Const
* And more!!!

## AngularJS Demo App

### Overview

1. Show it running in the browser.
1. Give a quick rundown of the code files.
 1. We've got two controllers and views (one for each screen in our app).
 1. We've got a data service that uses in-memory data (i.e. an array of objects).
 1. We've got a very simple directive for our menu.

### Converting to TypeScript

#### Add `tsconfig.json` file.

Snippet: `_tsconfig`

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
        "!./node_modules/**/*.ts",
        "!./typings/main.d.ts",
        "!./typings/main/**/*.d.ts"
    ],
    "files": [
    ],
    "atom": {
        "rewriteTsconfig": true
    }
}
```

#### Hand Waving

TypeScript won't know about AngularJS, so we need to bring the appropriate type definition files into our project. We don't have time to cover that as part of this presentation, so I already took care of that earlier.

#### Convert a Controller

Let's convert our `HeroDetailController` to be a class. First off, we'll change the file extension to `.ts`. Then we'll add the `ng.ILocationService` type to the `$location` parameter.

Our `dataService` parameter does not have type information. To fix this, let's add `IHero` and `IDataService` interfaces.

Snippet: `_interfaces`

```
interface IHero {
    name: string;
    team: string;
}

interface IDataService {
    getHeroes(): ng.IPromise<{ heroes: IHero[] }>;
    addHero(hero: IHero): ng.IPromise<void>;
}
```

Now we can update the `dataService` parameter in our `HeroDetailController` to be of type `IDataService`.

Now, let's replace the HeroDetailController function with this class.

```
class HeroDetailController {
    name: string;
    team: string;

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

#### Step by Step Instructions

I wrote up step-by-step instructions and included them with my presentation materials.

## Angular 2 Demo

### Overview

1. Show it running in the browser.
1. Give a quick rundown of the code files.
 1. We got exactly one `component` which is roughly the equivalent to a `controller` in AngularJS 1.x.
 1. Notice that we have a interface and a class.
 1. Notice that we're using a decorator to declare the metadata about the component, including the template to use.
