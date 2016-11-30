clientportal.controller("ClientportalController", function ($scope, $state, $rootScope, $stateParams, API) {
    //$scope.plans = [
    //    { id: 1, name: 'Lose Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
    //    { id: 2, name: 'Mental health', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Check Mental health', carerObjective: 'Perersonal Trainer once a week' }
    //];

    // get curret client
    var req = {
        method: 'get',
        url: '/Client/' + $stateParams.clientid,
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.clientName = _res.data.data[0].FirstName + " " + _res.data.data[0].LastName;
            $scope.plans = _res.data.data[0].CarePlans;
        }
        else {
            $scope.plans = [];
        }
    }, function (error) {
    }).finally(function () {
        $rootScope.loading = false;
    });

    $scope.openPlanModal = function (_id) {
        $('.detailsModal').modal('show');
        for (var i = 0; i < $scope.plans.length; i++) {
            if ($scope.plans[i]._id == _id) {
                $scope.currentPlan = $scope.plans[i];
            }
        }
        console.log($scope.currentPlan);
    }

    $scope.notes = [];

    $scope.addNotes = false;
    $scope.addProgressNote = function () {
        if ($scope.txtNote != null || $scope.txtNote != '') {
            $scope.currentPlan.Progress.push({ Text: $scope.txtNote, Provider: $scope.clientName, Date: new Date() });
            $scope.txtNote = '';
        }
        $scope.addNotes = false;
    }
    $scope.showDetails = true;

});


// local storage update 
//var updatedUser = localstorage.getObject('currentUser');
//updatedUser.FirstName = "eeeeee";
//localstorage.resetObject('currentUser', updatedUser);