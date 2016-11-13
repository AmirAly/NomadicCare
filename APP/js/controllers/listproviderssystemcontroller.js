ehs.controller("ListproviderssystemController", function ($scope, $state, $rootScope, $stateParams, API) {
    $rootScope.pageHeader = 'Providers List';

    var req = {
        method: 'get',
        url: '/Coordinator/List/' + $stateParams.orgid,
        data: {}
    }
    ////loader
    //$scope.loading = true;

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
    });



    //$scope.providers = [{ name: 'Ali Ahmed', address: 'Egypt, Cairo 20 Masr St.', img: 'images/unknown.png' },
    //{ name: 'Samar Johns', address: 'Egypt, Cairo 30 Masr St.', img: 'images/user9.jpg' },
    //{ name: 'Majed Sayed', address: 'Egypt, Cairo 40 Masr St.', img: 'images/user8.jpg' },
    //{ name: 'Kamelia Alaa', address: 'Egypt, Cairo 50 Masr St.', img: 'images/user7.jpg' }];

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
