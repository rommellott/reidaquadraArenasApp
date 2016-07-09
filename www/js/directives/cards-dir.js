'use strict';
angular.module('main')
  .directive('preImg', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        ratio: '@',
        helperClass: '@'
      },
      controller: function ($scope) {
        $scope.loaded = false;

        this.hideSpinner = function () {
          // Think i have to use apply because this function is not called from this controller ($scope)
          $scope.$apply(function () {
            $scope.loaded = true;
          });
        };
      },
      templateUrl: 'templates/misc/pre-img.html'
    };
  })

  .directive('spinnerOnLoad', function () {
    return {
      restrict: 'A',
      require: '^preImg',
      scope: {
        ngSrc: '@'
      },
      link: function (scope, element, attr, preImgController) {
        element.on('load', function () {
          // Set visibility: true + remove spinner overlay
          preImgController.hideSpinner();
        });
        // scope.$watch('ngSrc', function() {
        //   // Set visibility: false + inject temporary spinner overlay
        // });
      }
    };
  })

  .directive('multiBg', function (_) {
    return {
      scope: {
        multiBg: '=',
        interval: '=',
        helperClass: '@'
      },
      controller: function ($scope, $element) {
        $scope.loaded = false;
        var utils = this;

        this.animateBg = function () {
          // Think i have to use apply because this function is not called from this controller ($scope)
          $scope.$apply(function () {
            $scope.loaded = true;
            $element.css({ 'background-image': 'url(' + $scope.bg_img + ')' });
          });
        };

        this.setBackground = function (bg) {
          $scope.bg_img = bg;
        };

        if (!_.isUndefined($scope.multiBg)) {
          if (_.isArray($scope.multiBg) && ($scope.multiBg.length > 1) && !_.isUndefined($scope.interval) && _.isNumber($scope.interval)) {
            // Then we need to loop through the bg images
            utils.setBackground($scope.multiBg[0]);
          }
          else {
            // Then just set the multiBg image as background image
            utils.setBackground($scope.multiBg[0]);
          }
        }
      },
      templateUrl: 'templates/misc/multi-bg.html',
      restrict: 'A',
      replace: true,
      transclude: true
    };
  })


  .directive('bg', function () {
    return {
      restrict: 'A',
      require: '^multiBg',
      scope: {
        ngSrc: '@'
      },
      link: function (scope, element, attr, multiBgController) {
        element.on('load', function () {
          multiBgController.animateBg();
        });
      }
    };
  });
