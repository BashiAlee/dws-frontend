// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiURL: "http://172.25.33.42:8081/dws/",
  // uploadUrl: "http://172.25.33.42:8079/dws/"

  // apiURL: 'http://18.188.240.44:8080/dws/',
  // uploadUrl: 'http://18.216.55.104:8079/dws/'

  apiURL: 'https://api.droneworkforcesolutions.com/dws/',
  uploadUrl: 'https://upload.droneworkforcesolutions.com/dws/'

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
