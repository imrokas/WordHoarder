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
		    //console.log("Authenticated successfully with payload:", authData);
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
		    //console.log("Successfully created user account with uid:", userData.uid);
		    $state.go('login');
		  }
		});
	};

	logout = function() {
		authObj.$unauth();
		//console.log('clicked logout');
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
.factory('FirebaseFactory', function($firebaseArray) {
	var firebaseUrl = "https://wordhoarder.firebaseio.com";
	var ref = new Firebase(firebaseUrl);
	var list = $firebaseArray(ref);
	//return reference to firebase
	var getRef = function() {
		return ref;
	};

	// var addWord = function(data) {
	// 	data.uid = ref.getAuth.uid;
	// 	list.$add(data).then(function(ref) {
	// 		console.log('word: ' + data + ' added with id ' + ref);
	// 	});
	// };

	// var getAllWords = function() {
	// 	return list.$loaded().then(function(){
	// 		return list.filter(function(word){
	// 			return word.uid === ref.getAuth().uid;
	// 		});
	// 	});
	// };

	return {
		getRef: getRef,
		//add: addWord,
		//getAllWords: getAllWords
	};
});
