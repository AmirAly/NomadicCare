clientportal.controller("ClientportalController", function ($scope, API) {
    $scope.plans = [
        { id: 1, name: 'Lose Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
        { id: 2, name: 'Mental health', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Check Mental health', carerObjective: 'Perersonal Trainer once a week' }
    ];

    $scope.openPlanModal = function (_id) {
        $('.detailsModal').modal('show');
        for (var i = 0; i < $scope.plans.length; i++) {
            if ($scope.plans[i].id == _id) {
                $scope.currentPlan = $scope.plans[i];
            }
        }
        console.log($scope.currentPlan);
    }

    $scope.notes = [{ text: 'Pretty good' }, { text: 'fine' }];

    $scope.addNotes = false;
    $scope.addProgressNote = function () {
        $scope.notes.push({ text: $scope.txtNote });
        $scope.addNotes = false;
        $scope.txtNote = '';
    }
    $scope.showDetails = true;

});


// local storage update 
//var updatedUser = localstorage.getObject('currentUser');
//updatedUser.FirstName = "eeeeee";
//localstorage.resetObject('currentUser', updatedUser);