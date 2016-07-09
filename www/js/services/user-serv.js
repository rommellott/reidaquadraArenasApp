'use strict';
angular.module('main')
  .factory('UserService', function (Ref, $firebaseObject) {
    var service = {
      getRef: getRef,
      getUserProfile: getUserProfile,
    };

    return service;

    function getRef() {
      return Ref.child('users');
    }

    function getUserProfile(id) {
      return $firebaseObject(getRef().child(id));
    }
  });


