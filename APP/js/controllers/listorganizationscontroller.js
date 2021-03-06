﻿ehs.controller("ListorganizationsController", function ($scope, $state, $rootScope, API, $timeout) {
    $rootScope.pageHeader = 'Organisations List';


    var req = {
        method: 'get',
        url: '/Organization',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.Organisations = _res.data.data;
        }
        else {
            $scope.Organisations = [];
        }
        //$scope.loading = false;
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    })
    .finally(function () {
        $rootScope.loading = false;
    });

    $scope.showCreateOrganization = function () {
        $state.go('organization', { orgid: "" });
    }

    $scope.showOrganizationDetails = function (_id) {
        $state.go('organization', { orgid: _id });
    }
});
