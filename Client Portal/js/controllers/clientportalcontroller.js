clientportal.controller("ClientportalController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {

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
            $scope.notUser = false;
        }
        else {
            $scope.notUser = true;
            $scope.showMessage = true;
            $scope.messageTxt = 'No Such Client ...';
            $scope.messageStatus = 'warning';
        }
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
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
        $scope.showDetails = true;
    }

    $scope.notes = [];

    $scope.addNotes = false;
    $scope.addProgressNote = function () {
        if ($scope.txtNote != null || $scope.txtNote != '') {
            $scope.currentPlan.Progress.push({ Text: $scope.txtNote, Provider: $scope.clientName, Date: new Date() });
            $scope.txtNote = '';
            $timeout(function () {
                $('.prgrsDv').scrollTop(document.body.scrollHeight);
            }, 500);
        }
        $scope.addNotes = false;
    }

    $scope.save = function () {
        var req = {
            method: 'put',
            url: '/CarePlans/ProgressNotes',
            data: {
                clientId: $stateParams.clientid,
                planId: $scope.currentPlan._id,
                notes: $scope.currentPlan.Progress
            }
        }
        console.log(req);
        $rootScope.loading = true;
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $scope.showDetails = !$scope.showDetails;
                $scope.dismiss();
            }
            else {
                $scope.showMessage2 = true;
                $scope.messageTxt2 = _res.data.data;
                $scope.messageStatus2 = 'danger';
            }
            //$scope.loading = false;
        }, function (error) {
            $scope.showMessage2 = true;
            $scope.messageTxt2 = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            $scope.messageStatus2 = 'warning';
        }).finally(function () {
            $rootScope.loading = false;
        });
    }
});


// local storage update 
//var updatedUser = localstorage.getObject('currentUser');
//updatedUser.FirstName = "eeeeee";
//localstorage.resetObject('currentUser', updatedUser);