var carerportal = angular.module("carerportal", ['ui.router']);


//carerportal.config(function ($routeProvider) {
//    $routeProvider
//        .when("/:providerid", {
//            controller: "CarerportalController",
//            templateUrl: "views/carerportal.html"
//        })
//});

carerportal.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        cache: false,
        url: '/:providerid',
        views: {
            '': { templateUrl: 'views/carerportal.html', controller: 'CarerportalController' }
        }
    })
});