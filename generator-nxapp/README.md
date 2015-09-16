> Yeoman generator for NxApp - lets you quickly set up a project with sensible defaults and best practices.

## Usage

For step-by-step instructions on using Yeoman and this generator to build a TODO NxApp application from scratch see [this tutorial.](http://yeoman.io/codelab/)

Install `yo`, `grunt-cli`, `bower`, `generator-angular` and `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo nxapp`, optionally passing an app name:
```
yo nxapp [app-name]
```

Run `yo nxapp`, optionally install dependencies:
```
yo nxapp [app-name] --install
```

## Generators

Available generators:

* [nxapp](#app) (aka [nxapp:app](#app))
* [nxapp:menu](#menu)
* [nxapp:crud](#menu)

### App
Sets up a new Nx App, generating all the boilerplate you need to get started. The app generator also optionally installs Bootstrap and additional AngularJS modules, such as angular-resource (installed by default).

Example:
```bash
yo nxapp
```

### Menu
Generates a menu.

Example:
```bash
yo nxapp:menu NewMenu
```

### Crud
Generates a crud in `src`.

Example:
```bash
yo nxapp:crud
```

**Explicitly define a app name**

Example:
```bash
yo nxapp:crud user
```

**Explicitly install dependencies**

Example:
```bash
yo nxapp:crud user --install
```

Produces `src/user/User.js`.
Produces `src/user/UserConfig.js`.
Produces `src/user/UserService.js`.
Produces `src/user/consultaUser.html`.
Produces `src/user/ConsultaUserController.js`.
Produces `src/user/formularioUser.html`.
Produces `src/user/FormularioUserController.html`.

Automatically add crud files in `src/index.html`.


## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/alairjt/generator-nxapp/releases)