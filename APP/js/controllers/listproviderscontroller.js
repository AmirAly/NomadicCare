ehs.controller("ListprovidersController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    $rootScope.pageHeader = 'Providers List';
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



    $scope.showProviderDetails = function (_id) {
        $state.go('provider', { orgid: $stateParams.orgid, providerid: _id });
    }

    $scope.showCreateProvider = function () {
        $state.go('provider', { orgid: $stateParams.orgid, providerid: "" });
    }
});
