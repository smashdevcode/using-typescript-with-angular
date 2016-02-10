
# AngularJS Application Migration to TypeScript

## tsconfig

Add a `tsconfig.json` file to the root of the project.

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

## Convert JavaScript Files

Change the file extension of one or more JavaScript files to `.ts`. For this example, let's start with the `./client/app/services/data.service.js` file.

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






Convert the data service to a class
    Change the factory to be a service







Update the build process

ES6 Features
    Use back ticks in the menu directive
TS doesn't know about "angular"
    Using typings to bring in the type definition file
Tips and Tricks
    Follow John Papa's style guide
    Use classes for controllers
        Use "controller as" syntax
    Prefer services to factories
