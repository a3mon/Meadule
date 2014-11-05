'use strict';

/* Controllers */

var app = angular.module('App', ['ngResource']);
app.factory('RecipeService', ['$resource', RecipeService]);

app.controller('SomeCtrl', ['$scope', 'RecipeService', function($scope, RecipeService) {
    new RecipeService().$get(function(result) {
        $scope.step = result.steps[0];
    });


    $scope.$watch('step', function() {
        $scope.debug = JSON.stringify($scope.step, undefined, 2);
    }, true);

}]);