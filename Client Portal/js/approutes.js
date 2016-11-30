//var clientportal = angular.module("clientportal", ['ngRoute']);


//clientportal.config(function ($routeProvider) {
//    $routeProvider
//    .when("/", {
//        controller: "ClientportalController",
//        templateUrl: "views/clientportal.html"
//    })   
//    $routeProvider.otherwise({ "redirectTo": "/" });
//});
var clientportal = angular.module("clientportal", ['ui.router']);

clientportal.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        cache: false,
        url: '/:clientid?',
        views: {
            '': { templateUrl: 'views/clientportal.html', controller: 'ClientportalController' }
        }
    })
});