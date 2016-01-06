angular.module('wordHoarder.dictionaryController', [])
.controller('DictionaryController', function($scope, FirebaseFactory, $firebaseArray, $state, $rootScope) {
	$scope.allWords = [];
	
	var list = $firebaseArray(FirebaseFactory.getRef());
	list.$loaded().then(function(arr){
		$scope.allWords = arr.filter(function(word, index){
			word.listIdx = index;
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

	$scope.edit = function($index){
		$rootScope.editWord = $scope.allWords[$index];
	};

	$scope.updateWord = function(data){
		list[data.listIdx].word = data.word;
		list[data.listIdx].definition = data.definition;
		list.$save(data.listIdx);
	};
});