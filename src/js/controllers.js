'use strict';

/* Controllers */

var app = angular.module('App', []);
app.factory('Recipe', Recipe);

app.controller('SomeCtrl', ['$scope', 'Recipe', function($scope, Recipe) {
    var r = Recipe;
    $scope.title = r.title;
    $scope.step = r.steps[0];

    $scope.debug = JSON.stringify($scope.step, undefined, 2);
}]);