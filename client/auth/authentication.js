angular.module('wordHoarder.authentication', [])
.controller('AuthController', function($scope, $state, AuthenticationFactory) {
	$scope.login = function(user){
		AuthenticationFactory.login(user);
		//reset values in form
		$scope.user.email = '';
		$scope.user.password = '';
	};

	$scope.register = function(user){
		AuthenticationFactory.register(user);
		//reset values in form
		$scope.user.email = '';
		$scope.user.password = '';
	};

	$scope.logout = function(){
		AuthenticationFactory.logout();
	};
});