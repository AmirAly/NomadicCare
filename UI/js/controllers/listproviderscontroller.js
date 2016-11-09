ehs.controller("ListprovidersController", function ($scope, $state, $rootScope) {
    $rootScope.pageHeader = 'Providers List';
    $scope.providers = [{ name: 'Ali Ahmed', address: 'Egypt, Cairo 20 Masr St.', img: 'images/unknown.png' },
    { name: 'Samar Johns', address: 'Egypt, Cairo 30 Masr St.', img: 'images/user9.jpg' },
    { name: 'Majed Sayed', address: 'Egypt, Cairo 40 Masr St.', img: 'images/user8.jpg' },
    { name: 'Kamelia Alaa', address: 'Egypt, Cairo 50 Masr St.', img: 'images/user7.jpg' }];

    $scope.showProviderDetails = function (_id) {
        $state.go('provider', { providerid: _id });
    }
});
