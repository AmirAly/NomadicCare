carerportal.controller("CarerportalController", function ($scope, $state, $rootScope, $stateParams, API) {
    console.log($stateParams.providerid);
    // get curret client
    var req = {
        method: 'get',
        url: '/Coordinator/' + $stateParams.providerid,
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $rootScope.providerName = _res.data.data[0].Name;
            $scope.Organization = _res.data.data[0].Organization;
        }
        else {
            $scope.showMessage = true;
            $scope.messageTxt = 'No Such Provider ...';
            $scope.messageStatus = 'warning';
        }
        //$scope.loading = false;
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    }).finally(function () {

        // get provider plans
        var req = {
            method: 'get',
            url: '/CarePlans/' + $scope.Organization,
            data: {}
        }
        ////loader
        $rootScope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $scope.careplans = [];
                $scope.plans = [];
                $scope.result = _res.data.data;

                var req2 = {
                    method: 'get',
                    url: '/Coordinator/List/' + $stateParams.orgid,
                    data: {}
                }
                API.execute(req2).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) {
                        $scope.providers = _res.data.data;
                    }
                    else {
                        $scope.providers = [];
                    }
                })
                   .finally(function () {
                       for (var i = 0; i < $scope.result.length; i++) {
                           for (var j = 0; j < $scope.result[i].CarePlans.length; j++) {
                               var _providerName;
                               var _providerImg;
                               for (var k = 0; k < $scope.providers.length; k++) {
                                   if ($scope.providers[k]._id == $scope.result[i].CarePlans[j].Provider) {
                                       _providerName = $scope.providers[k].Name;
                                       _providerImg = $scope.providers[k].Img;
                                   }
                               }
                               if ($scope.result[i].CarePlans[j].Provider == $stateParams.providerid) {
                                   $scope.careplans.push({
                                       clientId: $scope.result[i]._id,
                                       clientName: $scope.result[i].FirstName + " " + $scope.result[i].LastName,
                                       clientImg: $scope.result[i].Img,
                                       providerId: $scope.result[i].CarePlans[j].Provider,
                                       providerName: _providerName,
                                       providerImg: _providerImg,
                                       planId: $scope.result[i].CarePlans[j]._id,
                                       planName: $scope.result[i].CarePlans[j].PlanName,
                                       planStatus: $scope.result[i].CarePlans[j].Status,
                                       lastUpdated: $scope.result[i].CarePlans[j].LastUpdated,
                                   });
                               }
                           }
                       }
                       console.log($scope.careplans);

                   });
            }
            else {
                $scope.careplans = [];
                $scope.showMessage = true;
                $scope.messageTxt = 'No care plans found ...';
                $scope.messageStatus = 'warning';
            }
        });
    });

    //$scope.patients = [
    //    { id: 1, name: 'Sally Sally', img: 'images/unknown.png', plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
    //    { id: 2, name: 'John John', img: 'images/1.jpg', plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
    //    { id: 3, name: 'Jake John John', img: 'images/2.jpg', plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
    //    { id: 4, name: 'Luke Luke', img: 'images/3.jpg', plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' },
    //    { id: 5, name: 'Ahmed Ahmed Ahmed', img: 'images/4.jpg', plan: 'Manage Weight', startDate: '1/1/2016', endDate: '12/12/2016', Goal: 'Lose 10 kg', carerObjective: 'Perersonal Trainer once a week' }
    //];

    $scope.openPatientModal = function (_id) {
        $('.detailsModal').modal('show');
        for (var i = 0; i < $scope.careplans.length; i++) {
            if ($scope.careplans[i].planId == _id) {
                $scope.currentPatient = $scope.careplans[i];
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