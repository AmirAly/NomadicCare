var clientportal = angular.module("clientportal", ['ngRoute']);


clientportal.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        controller: "ClientportalController",
        templateUrl: "views/clientportal.html"
    })   
    $routeProvider.otherwise({ "redirectTo": "/" });
});

