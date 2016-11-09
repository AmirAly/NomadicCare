ehs.controller("HealthrecordController", function ($scope, $state, $rootScope, $stateParams) {
    //initiate page header
    $scope.clientname = 'Ahmed Ali';
    $scope.clientImg = 'images/user0.jpg';
    $scope.clientAge = '33';
    $scope.clientGender = 'Male';
    $scope.clientMobile = '2424565678';
    $scope.clientSuburb = 'Suburb';

    //console.log($stateParams.clientid);
    //console.log($stateParams.planid);

    $scope.activeoutertab = 'healthmeasurment';

    $scope.backToEditClient = function () {
        $state.go('client', { clientid: 1 });
    }
});