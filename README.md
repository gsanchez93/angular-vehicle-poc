# AngularVehiclePOC

This repository currently contains the nginx demo version the Angular POC app. The TDD test code is also here, but they're not updated when pagination and nginx were added, so don't expect them to pass.

## Setup

Setup is fairly simple. Simply install first the Angular CLI via the command `npm install -g @angular/cli`. Then clone the repository, and run `npm install` after navigating to the project folder.

Recommended node.js version is 6.9 or greater for Angular CLI. It's not yet required, but they will remove support for earlier versions of node.js in their next update.

## Angular CLI Commands

After finishing the setup, you can now run these commands while in the project folder:

Run `ng serve` to serve the app. You can easily view and test your app locally while developing when serving the app.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
  Before running the tests make sure you are serving the app via `ng serve`.

## Notable Angular CLI Commands For Development

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `ng help` to view the detailed list of available commands.

## Companion Node.js API Server

The app uses a companion Node.js API server. You can clone the node.js server repo here:

    https://github.com/gsanchez93/docker-vehicle-node
    
And either build it into Docker, or run the node server directly.

Note: The app is currently configured to use local db for the nginx demo, but it only works for the auction list. The app still uses the node API when you go into the vehicle info page. To use the API for the auciton list, simply replace the call 'vehicleService.getVehiclesFromLocalArray()' on the auction.component.ts to 'vehicleService.getVehicles()'

## Debugging

You can debug this Angular App via Visual Studio Code. Simply install the 'Debugger for Chrome' plugin and run F5 while serving the app.

The configuration file is located at .vscode/launch.json
