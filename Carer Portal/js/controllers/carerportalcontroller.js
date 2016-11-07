carerportal.controller("CarerportalController", function ($scope, API) {
    $scope.patients = [
        { id: 1, name: 'Sally Sally', img: 'images/unknown.png',  plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
        { id: 2, name: 'John John', img: 'images/1.jpg',  plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week'  },
        { id: 3, name: 'Jake John John', img: 'images/2.jpg',  plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
        { id: 4, name: 'Luke Luke', img: 'images/3.jpg',  plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
        { id: 5, name: 'Ahmed Ahmed Ahmed', img: 'images/4.jpg', plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week'  }
    ];

    $scope.openPatientModal = function (_id) {
        $('.detailsModal').modal('show');
        for (var i = 0; i < $scope.patients.length; i++) {
            if ($scope.patients[i].id == _id) {
                $scope.currentPatient = $scope.patients[i];
            }
        }
        console.log($scope.currentPatient);
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