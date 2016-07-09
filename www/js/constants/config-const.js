

/*global firebase*/
/*eslint no-undef: "error"*/

'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAfkQ7QG4LY6w0x5XNKzvu1VRiGOVyOxCY",
    authDomain: "rdqdb-a9419.firebaseapp.com",
    databaseURL: "https://rdqdb-a9419.firebaseio.com",
    storageBucket: "rdqdb-a9419.appspot.com",
};

// Initialize the FirebaseUI Widget using Firebase.
firebase.initializeApp(config);

angular.module('main')
  .factory('Ref', [function () {
    return firebase.database().ref();
  }]);
