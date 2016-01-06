angular.module('wordHoarder', [
	'wordHoarder.HomeController',
	'wordHoarder.authentication',
	'wordHoarder.dictionaryController',
	'wordHoarder.services',
	'wordHoarder.quiz',
	'firebase',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  	.state('home', {
    	url: '/home',
    	templateUrl: 'home/home.html',
    	controller: 'HomeController',
    	authenticate: false
  	})
  	.state('login', {
  		url: '/login',
  		templateUrl: 'auth/login.html',
  		controller: 'AuthController',
    	authenticate: false
  	})
  	.state('register', {
  		url: '/register',
  		templateUrl: 'auth/register.html',
  		controller: 'AuthController',
    	authenticate: false
  	})
  	.state('logout', {
  		url: '/logout',
  		templateUrl: 'auth/logout.html',
  		controller: 'AuthController',
    	authenticate: false
  	})
  	.state('allWords', {
  		url: '/all',
  		templateUrl: 'dictionary/all.html',
  		controller: 'DictionaryController',
    	authenticate: true
  	})
  	.state('addWord', {
  		url: '/add',
  		templateUrl: 'dictionary/add.html',
  		controller: 'DictionaryController',
    	authenticate: true
  	})
  	.state('editWord', {
  		url: '/edit',
  		templateUrl: 'dictionary/edit.html',
  		controller: 'DictionaryController',
    	authenticate: true
  	})
  	.state('quiz', {
  		url: '/quiz',
  		templateUrl: 'quiz/quiz.html',
  		controller: 'QuizController',
    	authenticate: true
  	});
}).run(run);


function run($rootScope, $state, AuthenticationFactory) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !AuthenticationFactory.isLoggedIn()) {
        $state.go("login");
        event.preventDefault();
    }
  });
};