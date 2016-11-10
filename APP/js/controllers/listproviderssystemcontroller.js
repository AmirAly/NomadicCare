ehs.controller("ListproviderssystemController", function ($scope, $state, $rootScope, $stateParams, API) {
    $rootScope.pageHeader = 'Providers List';
    $scope.providers = [{ name: 'Ali Ahmed', address: 'Egypt, Cairo 20 Masr St.', img: 'images/unknown.png' },
    { name: 'Samar Johns', address: 'Egypt, Cairo 30 Masr St.', img: 'images/user9.jpg' },
    { name: 'Majed Sayed', address: 'Egypt, Cairo 40 Masr St.', img: 'images/user8.jpg' },
    { name: 'Kamelia Alaa', address: 'Egypt, Cairo 50 Masr St.', img: 'images/user7.jpg' }];

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
