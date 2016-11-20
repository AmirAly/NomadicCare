var ehs = angular.module("ehs", ['ui.router', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'ui.dateTimeInput', 'uiSwitch']);

ehs.run(function ($rootScope, $state, slidePush) {
    $rootScope.logout = function () {
        if (confirm("Are you sure you want to logout ?") == true) {
            // if menu opened , close it first before  logout
            slidePush.pushForceClose(angular.element(document.querySelector('#menu')), angular.element(document.querySelector('#menuIcon')));
            $rootScope.currentProviderId = "";
            $rootScope.currentProviderName = "";
            $state.go('login');
        } else {
            console.log('cancel logout');
        }
    };
    $rootScope.DeleteConfirmed = false;
    $rootScope.DeleteConfirmed2 = false;
    $rootScope.OrganizationId = 0;
});