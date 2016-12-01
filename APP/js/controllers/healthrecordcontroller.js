ehs.controller("HealthrecordController", function ($scope, $state, $rootScope,$timeout, $stateParams, API) {

    // get curret client
    var req = {
        method: 'get',
        url: '/Client/' + $rootScope.ClientId,
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            console.log(_res.data.data[0].FirstName);

            $scope.currentClientInfo = _res.data.data[0];

            //initiate page header
            $scope.clientname = _res.data.data[0].FirstName + " " + _res.data.data[0].LastName;
            $scope.clientImg = _res.data.data[0].Img;
            $scope.clientAge = moment().diff(_res.data.data[0].DateOfBirth, 'years');
            if (_res.data.data[0].Gender == 0) 
                $scope.clientGender = 'Male';
             else 
                $scope.clientGender = 'Female';
            $scope.clientMobile = _res.data.data[0].Mobile;
            $scope.clientSuburb = 'Suburb';
        }
        else {
            $scope.showMessage = true;
            $scope.messageTxt = 'No Such Client ...';
            $scope.messageStatus = 'warning';
        }
        //$scope.loading = false;
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    }).finally(function () {
        $rootScope.loading = false;
    });


    

    //console.log($stateParams.clientid); Or $rootScope.ClientId
    //console.log($stateParams.planid);

    $scope.activeoutertab = 'healthmeasurment';

    $scope.backToEditClient = function () {
        $state.go('client', { clientid: $rootScope.ClientId });
    }
});