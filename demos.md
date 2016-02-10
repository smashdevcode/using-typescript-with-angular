
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
