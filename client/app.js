angular.module('wordHoarder', [
	'wordHoarder.HomeController',
	'firebase',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'home/home.html',
    controller: 'HomeController'
  });
});