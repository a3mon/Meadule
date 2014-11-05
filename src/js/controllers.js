'use strict';

/* Controllers */

var app = angular.module('App', ['ngResource']);
app.factory('RecipeService', ['$resource', RecipeService]);

app.controller('SomeCtrl', ['$scope', 'RecipeService', function($scope, RecipeService) {
    new RecipeService().$get(function(result) {
        $scope.recipe = result;
        $scope.stepIndex = 0;
        $scope.step = result.steps[0];
    });

    $scope.back = function () {
        var last = $scope.recipe.steps.length - 1;
        $scope.stepIndex -= 1;
        $scope.stepIndex = $scope.stepIndex < 0 ? last : $scope.stepIndex; 
        
        $scope.step = $scope.recipe.steps[$scope.stepIndex];
    };

    $scope.next = function () {
        var length = $scope.recipe.steps.length;
        $scope.stepIndex += 1;
        $scope.stepIndex %= length; 
        
        $scope.step = $scope.recipe.steps[$scope.stepIndex];
    };


    $scope.$watch('recipe', function() {
        $scope.debug = JSON.stringify($scope.recipe, undefined, 2);
    }, true);

}]);