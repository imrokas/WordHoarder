angular.module('wordHoarder.dictionaryController', [])
.controller('DictionaryController', function($scope, FirebaseFactory, $firebaseArray) {
	$scope.addWord = [];
	$firebaseArray(FirebaseFactory.getRef()).$loaded().then(function(arr){
		console.log('arr before filter: ', arr);
		$scope.allWords = arr.filter(function(word){
			return word.uid === FirebaseFactory.getRef().getAuth().uid;
		});
		console.log('Words loaded: ', $scope.allWords);
	});
	//$scope.allWords = FirebaseFactory.getAllWords();
	$scope.addWord = function(data) {
		data.uid = FirebaseFactory.getRef().getAuth().uid;
		console.log('data = ', data);
		$firebaseArray(FirebaseFactory.getRef()).$add(data);
	};

	$scope.deleteWord = function(data) {
		console.log('delete data = ', data);
		$firebaseArray(FirebaseFactory.getRef()).$remove(data);
	};
});