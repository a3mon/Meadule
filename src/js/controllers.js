'use strict';

/* Controllers */

var app = angular.module('App', ['ngResource', 'ngSanitize']);
app.factory('RecipeService', ['$resource', RecipeService]);
app.factory('RecipeHelper', RecipeHelper);

app.controller('SomeCtrl', ['$scope', 'RecipeService', 'RecipeHelper', function($scope, RecipeService, RecipeHelper) {
    new RecipeService().$get(function(result) {
        $scope.recipe = RecipeHelper.addIngredientStep(result);

        $scope.show(0);
    });

    $scope.show = function (stepIndex) {
    	$scope.stepIndex = stepIndex;
    	$scope.step = $scope.recipe.steps[stepIndex];
    };

    $scope.back = function () {
        var last = $scope.recipe.steps.length - 1;
        var stepIndex = $scope.stepIndex - 1;
        stepIndex = stepIndex < 0 ? last : stepIndex; 
        
        $scope.show(stepIndex);
    };

    $scope.next = function () {
        var length = $scope.recipe.steps.length;
        var stepIndex = $scope.stepIndex + 1;
        stepIndex %= length; 
        
        $scope.show(stepIndex);
    };

    $scope.$watch('recipe', function() {
        $scope.debug = JSON.stringify($scope.recipe, undefined, 2);
    }, true);

}]);