// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAQZ9LSGxGmDtw9HhwJUG8PT7JobEBfxQc",
    authDomain: "ibexapps-1505e.firebaseapp.com",
    projectId: "ibexapps-1505e",
    storageBucket: "ibexapps-1505e.appspot.com",
    messagingSenderId: "526614887519",
    appId: "1:526614887519:web:372d861c91ec63b8216fea",
    measurementId: "G-D6BSXXVSNR"
  }
};

export const booturl = "http://localhost:8080"
export const aiurl = "https://localhost:5000"
export const homeUrl = "http://localhost:4200"

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
