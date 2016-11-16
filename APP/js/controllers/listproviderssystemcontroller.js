ehs.controller("ListproviderssystemController", function ($scope, $state, $rootScope, $stateParams, API) {
    $rootScope.pageHeader = 'Providers List';
    if ($stateParams.orgid != 1000) {

        $scope.showAllProviders = false;
        var req = {
            method: 'get',
            url: '/Coordinator/List/' + $stateParams.orgid,
            data: {}
        }
        ////loader
        $rootScope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $scope.providers = _res.data.data;
            }
            else {
                $scope.providers = [];
            }
            //$scope.loading = false;
        }, function (error) {
            $scope.showMessage = true;
            $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            $scope.messageStatus = 'warning';
        }).finally(function () {
            $rootScope.loading = false;
        });
    }
    else {
        $scope.showAllProviders = true;
        var req = {
            method: 'get',
            url: '/Coordinator/List',
            data: {}
        }
        ////loader
        $rootScope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $scope.providers = _res.data.data;
            }
            else {
                $scope.providers = [];
            }
            //$scope.loading = false;
        }, function (error) {
            $scope.showMessage = true;
            $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            $scope.messageStatus = 'warning';
        }).finally(function () {
            $rootScope.loading = false;
        });
    }

    $scope.showOrganization = function (_id) {
        $state.go('organization', { orgid: $stateParams.orgid });
    }

    $scope.showProviderDetails = function (_id) {
        $state.go('providerssystem', { orgid: $stateParams.orgid, providerid: _id });
    }

    $scope.showCreateProviderSystem = function () {
        $state.go('providerssystem', { orgid: $stateParams.orgid, providerid: "" });
    }
});
