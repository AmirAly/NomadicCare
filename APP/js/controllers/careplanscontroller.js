ehs.controller("CareplansController", function ($scope, $state, $rootScope, $stateParams, $timeout, API) {
    $rootScope.EditPlanConfirmed = false;
    $timeout(function () {
        $rootScope.activeoutertab = 'careplans';
        console.log($scope.currentClientInfo.CarePlans);
        if ($scope.currentClientInfo.CarePlans.length == 0) {
            $scope.plans = [{
                _id: '', Status: '', Provider: '', Reason: '',
                OtherConsideration: '', OtherPlan: '',
                PlanName: 'Plan', ToImprove: '', Progress: '',
                ToAchieve1: '', AgreedActions1: '', ByWho1: { Name: '', Email: '' }, ByWhen1: new moment(),
                ToAchieve2: '', AgreedActions2: '', ByWho2: { Name: '', Email: '' }, ByWhen2: new moment()
            }];
        }
        else { $scope.plans = $scope.currentClientInfo.CarePlans; }

        $scope.activePlan = $scope.plans[0];
        if ($stateParams.planid == "") {
            $scope.activePlanTab = $scope.plans[0]._id;
        }
        else {
            $scope.activePlanTab = $stateParams.planid;
        }
        console.log($scope.activePlanTab);

    }, 500);

    $scope.setBywhoData = function () {
        console.log($scope.activePlan);
    }



    $scope.newPlan = {
        _id: '', Status: '', Provider: '', Reason: '',
        OtherConsideration: '', OtherPlan: '',
        PlanName: 'Plan', ToImprove: '', Progress: '',
        ToAchieve1: '', AgreedActions1: '', ByWho1: { Name: '', Email: '' }, ByWhen1: new moment(),
        ToAchieve2: '', AgreedActions2: '', ByWho2: { Name: '', Email: '' }, ByWhen2: new moment()
    };

    $scope.createPlan = function () {
        console.log('add');
        $scope.plans.push($scope.newPlan);
        console.log($scope.plans);
        //// save now 

        //$scope.activePlanTab = 999;
        //$stateParams.planid = 999;
        //$scope.activePlan = $scope.plans[3];
    }

    $scope.deletePlan = function (_plan) {
        // show modal / confirmation + modal
        //..
        console.log('delete');
        var index = $scope.plans.indexOf(_plan);
        $scope.plans.splice(index, 1);
        console.log($scope.plans);
        $scope.activePlanTab = 1;
        $scope.activePlan = $scope.plans[0];

    }

    $scope.setActivePlan = function (_plan) {
        $scope.activePlanTab = _plan._id;
        $scope.activePlan = _plan;
    }

    $scope.submit = function (form) {
        angular.forEach($scope.frmPlan.$error.required, function (field) {
            field.$setDirty();
        });
        if ($scope.newPlan.Provider == '10') {
            angular.element(document.getElementById('cmbProvider')).addClass('errorBorder');
            angular.element(document.getElementById('lblProvider')).addClass('errorFont');
        }
        if (form.$valid) {
            var req = {
                method: 'put',
                url: '/CarePlans',
                data: $scope.plans
            }
            console.log($scope.plans);

            //API.execute(req).then(function (_res) {
            //    console.log(_res.data);
            //    if (_res.data.code == 100) { // Client
            //        $scope.showMessage = true;
            //        $scope.messageTxt = 'Saved ...';
            //        $scope.messageStatus = 'success';
            //        $scope.frmAddClient.$setPristine();
            //    }
            //    else {
            //        $scope.showMessage = true;
            //        $scope.messageTxt = _res.data.data;
            //        $scope.messageStatus = 'danger';
            //    }
            //}, function (error) { // another error may be connection error
            //    $scope.showMessage = true;
            //    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            //    $scope.messageStatus = 'warning';
            //}).finally(function () {
            //    $rootScope.loading = false;
            //});
        }
    }









    $scope.datepickerconfigurations1 = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdownByWhen1'
    };

    $scope.datepickerconfigurations2 = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdownByWhen2'
    };

    $scope.onTimeSetPlan = function (_newDate, _oldDate, _id) {
        $timeout(function () {
            angular.element(document.getElementById('txtByWhen' + _id)).addClass('used');
        });
    }

    $scope.openModalByWho = function (_provider) {
        $('#byWhoModal').modal('show');
        $timeout(function () {
            angular.element(document.getElementById('byWhoModal')).addClass('showMe');
        }, 1000);

    }
});

//console.log($scope.plans[_id].ByWhen1);