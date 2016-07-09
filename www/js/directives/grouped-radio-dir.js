'use strict';
angular.module('main')
  .directive('groupedRadio', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        value: '=groupedRadio'
      },
      link: function (scope, element, attrs, ngModelCtrl) {
        element.addClass('button');
        element.on('click', function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(scope.value);
          });
        });

        scope.$watch('model', function (newVal) {
          element.removeClass('button-positive');
          if (newVal === scope.value) {
            element.addClass('button-positive');
          }
        });
      }
    };
  });
