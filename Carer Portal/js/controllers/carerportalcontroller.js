carerportal.controller("CarerportalController", function ($scope, $state, $rootScope, $stateParams, API) {
    console.log($stateParams.providerid);
    //if ($stateParams.providerid == '') {
    //    $stateParams.providerid = "58284325d74fc70e34336e06";
    //}
    // get curret provider
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
                                   console.log($scope.result[i]);
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
                                       toImprove: $scope.result[i].CarePlans[j].ToImprove,
                                       carerObjective: $scope.result[i].CarePlans[j].ToAchieve1 + " - " + $scope.result[i].CarePlans[j].ToAchieve2,
                                       note: $scope.result[i].CarePlans[j].Progress,
                                       date: $scope.result[i].CarePlans[j].ByWhen1
                                   });
                               }
                           }
                       }
                       console.log($scope.careplans);
                       $rootScope.loading = false;
                       console.log($rootScope.loading);
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


    $scope.openPatientModal = function (_id) {
        $('.detailsModal').modal('show');
        for (var i = 0; i < $scope.careplans.length; i++) {
            if ($scope.careplans[i].planId == _id) {
                $scope.currentPlan = $scope.careplans[i];
            }
        }
        console.log($scope.currentPlan);
    }

    $scope.addNotes = false;
    $scope.addProgressNote = function () {
        if ($scope.txtNote != null || $scope.txtNote != '') {
            $scope.currentPlan.note.push({ Text: $scope.txtNote, Provider: $rootScope.providerName, Date: new Date() });
            $scope.txtNote = '';
        }
        $scope.addNotes = false;
    }
    $scope.showDetails = true;
});

