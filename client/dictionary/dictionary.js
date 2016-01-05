angular.module('wordHoarder.dictionaryController', [])
.controller('DictionaryController', function($scope, AuthenticationFactory) {
	$scope.logout = function() {
		AuthenticationFactory.logout();
	};
});