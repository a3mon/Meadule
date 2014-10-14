(function() {

	'use strict';

	/* Controllers */

	var app = angular.module('App', []);

	app.controller('SomeCtrl', ['$scope', function($scope) {
	  $scope.hello = 'hello from angular';
	}]);

})();