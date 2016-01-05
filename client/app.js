angular.module('wordHoarder', [
	'wordHoarder.HomeController',
	'wordHoarder.authentication',
	'firebase',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  	.state('home', {
    	url: '/home',
    	templateUrl: 'home/home.html',
    	controller: 'HomeController'
  	})
  	.state('login', {
  		url: '/login',
  		templateUrl: 'auth/login.html',
  		controller: 'AuthController'
  	})
  	.state('register', {
  		url: '/register',
  		templateUrl: 'auth/register.html',
  		controller: 'AuthController'
  	});
});