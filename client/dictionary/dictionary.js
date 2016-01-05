angular.module('wordHoarder.dictionaryController', [])
.controller('DictionaryController', function($scope, FirebaseFactory, $firebaseArray) {
	$scope.allWords = [];
	var list = $firebaseArray(FirebaseFactory.getRef());
	list.$loaded().then(function(arr){
		$scope.allWords = arr.filter(function(word){
			return word.uid === FirebaseFactory.getRef().getAuth().uid;
		});
	});
	$scope.addWord = function(data) {
		data.uid = FirebaseFactory.getRef().getAuth().uid;
		list.$add(data);
	};

	$scope.deleteWord = function(data, $index) {
		list.$remove(data).then(function(ref) {
			$scope.allWords.splice($index,1);
		});
	};
});