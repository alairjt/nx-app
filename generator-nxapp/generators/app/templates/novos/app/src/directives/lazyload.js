'use strict';

/**
 * @ngdoc function
 * @name app.directive:lazyload
 * @description
 * # uiScroll
 * Directive of the app
 */
angular.module('nxApp')
  .directive('lazyLoad', ['$ocLazyLoad', '$compile', function($ocLazyLoad, $compile) {
    return {
      restrict: 'A',
      compile: function (el, attrs) {
        var contents = el.contents().remove(), name;
        return function(scope, el, attrs){
          $ocLazyLoad.load(attrs.lazyLoad)
          .then(function(){
            $compile(contents)(scope, function(clonedElement, scope) {
              el.append(clonedElement);
            });
          });
        }
      }
    };
  }]);
