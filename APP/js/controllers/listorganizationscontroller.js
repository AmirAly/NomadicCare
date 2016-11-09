ehs.controller("ListorganizationsController", function ($scope, $state, $rootScope) {
    $rootScope.pageHeader = 'Organisations List';
    $scope.Organisations = [
        { name: 'Al Motaheda 1', address: 'Egypt, Cairo 20 Masr St.' },
    { name: 'Al Motaheda 2', address: 'Egypt, Cairo 30 Masr St.' },
    { name: 'Al Motaheda 3', address: 'Egypt, Cairo 40 Masr St.' },
    { name: 'Al Motaheda 4', address: 'Egypt, Cairo 50 Masr St.' }
    ];

    $scope.showOrganizationDetails = function (_id) {
        $state.go('organization', {orgid:_id});
    }
});
