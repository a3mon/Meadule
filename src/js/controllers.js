'use strict';

/* Controllers */

var app = angular.module('App', []);
app.factory('Recipe', Recipe);

app.controller('SomeCtrl', ['$scope', 'Recipe', function($scope, Recipe) {
    var r = Recipe;
    $scope.title = r.title;
    $scope.steps = r.steps;

    $scope.debug = JSON.stringify(r, undefined, 2);
}]);