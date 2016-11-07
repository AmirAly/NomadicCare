var carerportal = angular.module("carerportal", ['ngRoute']);


carerportal.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "CarerportalController",
            templateUrl: "views/carerportal.html"
        })
});

