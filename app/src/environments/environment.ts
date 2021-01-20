// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD8IF4hzqpv3qGDyB_mnWkxTveRMiEP1fU",
    authDomain: "trigar-f4a69.firebaseapp.com",
    databaseURL: "https://trigar-f4a69.firebaseio.com",
    projectId: "trigar-f4a69",
    storageBucket: "trigar-f4a69.appspot.com",
    messagingSenderId: "883269818599",
    appId: "1:883269818599:web:9dbe8343cb1cccd7",
    vapidKey: 'BP6rvFtg0uSUw0fVrmTvdwCXF2ZNvA7EfjBD0Ir1BTbhd5TArviANSIOmO1gn_Vm4Kp0TfJNczGV_MX0MOvNMTY'
  },

  serverFileUrl: '/api/fileupload',
  serverUrl: '/api',
  filesUrl: 'https://vps-1060583-x.dattaweb.com:4076/files',
  // serverUrl: 'http://localhost:3076/api',
  // filesUrl: 'http://localhost:3076/files',
  appUrlDownload: 'http://trigar.com.ar/app',
  pnAppId: '5ced9db0fcfcff2d22897be9',
  version: "0.8.45"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
