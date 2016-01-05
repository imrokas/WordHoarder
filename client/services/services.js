angular.module('wordHoarder.services', [])
.factory('AuthenticationFactory', function($firebaseAuth, FirebaseFactory, $state, $rootScope) {
	var ref = FirebaseFactory.getRef();
	var authObj = $firebaseAuth(ref);

	var isLoggedIn = function() {
		if(ref.getAuth()) {
			$rootScope.loggedIn = true;
		}
		return ref.getAuth();
	};

	var login = function(user) {
		ref.authWithPassword({
		  email    : user.email,
		  password : user.password
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    $state.go('allWords');
		  }
		}, {
			remember: 'sessionOnly'
		});
	};

	var register = function(user) {
		ref.createUser({
		  email    : user.email,
		  password : user.password
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    $state.go('login');
		  }
		});
	};

	logout = function() {
		authObj.$unauth();
		console.log('clicked logout');
		$rootScope.loggedIn = false;
		$state.go('home');
	}

	return {
		isLoggedIn: isLoggedIn,
		login: login,
		register: register,
		logout: logout
	};	
})
.factory('FirebaseFactory', function() {
	var firebaseUrl = "https://wordhoarder.firebaseio.com";
	var ref = new Firebase(firebaseUrl);
	//return reference to firebase
	var getRef = function() {
		return ref;
	};
	return {
		getRef: getRef
	};
});

// var ref = new Firebase("https://wordhoarder.firebaseio.com");
// 	var authObj = $firebaseAuth(ref);
// 	$scope.register = function(user) {
// 		ref.createUser({
// 		  email    : user.email,
// 		  password : user.password
// 		}, function(error, userData) {
// 		  if (error) {
// 		    console.log("Error creating user:", error);
// 		    $scope.reg = true;
// 		    $scope.msg = error;
// 		  } else {
// 		    console.log("Successfully created user account with uid:", userData.uid);
// 		    $scope.msg = userData.uid;
// 		    $scope.reg = true;
// 		  }
// 		});
// 		user.email = '';
// 		user.password = '';
// 	};

// 	$scope.loggedIn = function() {
// 		if(ref.getAuth()) {
// 			$scope.loggedInMsg = "user is logged in.";
// 			console.log("user is logged in.");
// 			return true;
// 		}
// 		$scope.loggedOutMsg = "user is logged out.";
// 		console.log("user is logged out.");
// 		return false;
// 	}

// 	$scope.login = function(user) {
// 		ref.authWithPassword({
// 		  email    : user.email,
// 		  password : user.password
// 		}, function(error, authData) {
// 		  if (error) {
// 		    console.log("Login Failed!", error);
// 		  } else {
// 		  	$scope.log = true;
// 		  	$scope.msg = "Logged in as:" + authData.uid;
// 		    console.log("Authenticated successfully with payload:", authData);
// 		  }
// 		}, {
// 			remember: 'sessionOnly'
// 		});
// 		user.email = '';
// 		user.password = '';
// 	};

// 	$scope.logout = function() {
// 		console.log('inside logout');
// 		ref.unauth();
// 		console.log('ref = ', ref);
// 	}