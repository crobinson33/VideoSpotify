angular.module('ChoobiApp', [
  'ChoobiApp.controllers',
  'ngRoute',
  'UserApp',
  'youtube'
])
.run(function($rootScope, user) {
	console.log("user stuff");
	//user.init({ appId: '53797a9b5ce08' });
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when("/home", { templateUrl: "partials/home.html", controller: "homeController", public: false})
	.when('/login', { templateUrl: 'partials/login.html', login: true})
	.when('/signup', {templateUrl: 'partials/signup.html', public: true})
	.otherwise({redirectTo: '/home'});
}]);