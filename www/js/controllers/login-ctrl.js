/*global firebase firebaseui _*/
'use strict';
angular.module('main')
  .controller('LoginCtrl', function ($state, Ref) {

    var auth = firebase.auth();

    // FirebaseUI config.
    var uiConfig = {
      // Query parameter name for mode.
      'queryParameterForWidgetMode': 'mode',
      // Query parameter name for sign in success url.
      'queryParameterForSignInSuccessUrl': 'signInSuccessUrl',
      'signInSuccessUrl': '#/tab/arenas',
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      'tosUrl': '<your-tos-url>',
      'callbacks': {
        'signInSuccess': function (currentUser, credential) {
          var providerData = {};
          Ref.child('users/' + currentUser.uid).once('value', function (snap) {
            if (snap.val() === null) {
              if (credential.provider === 'facebook.com') {
                providerData = _.find(currentUser.providerData, { 'providerId': 'facebook.com' });
                Ref.child('users/' + currentUser.uid).set({
                  nome: providerData.displayName,
                  fotoPerfil: providerData.photoURL,
                  email: providerData.email
                });
                currentUser.updateProfile({
                  displayName: providerData.displayName,
                  photoURL: providerData.photoURL
                });
              }
              $state.go('wizard.intro');
            }
            else {
              if (credential.provider === 'facebook.com') {
                providerData = _.find(currentUser.providerData, { 'providerId': 'facebook.com' });
                var user = snap.val();
                user.fotoPerfil = providerData.photoURL;
                Ref.child('users/' + currentUser.uid).set(user);
                currentUser.updateProfile({
                  displayName: providerData.displayName,
                  photoURL: providerData.photoURL
                });
              }
              return true;
            }
          }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
          });
        }
      }
    };
    var ui = new firebaseui.auth.AuthUI(auth);
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

  });
