'use strict';
angular.module('main')
  .controller('StartupCtrl', function ($scope, $state, user) {
    user.$bindTo($scope, 'user');

    $scope.start = function () {
      console.log($scope.user);
      $state.go('tab.arenas');
    };

    $scope.startCondition = function () {
      return angular.isDefined($scope.user.telefone);
    };
  });
