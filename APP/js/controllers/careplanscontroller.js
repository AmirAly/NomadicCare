ehs.controller("CareplansController", function ($scope, $state, $rootScope, $stateParams, $timeout) {
    $rootScope.EditPlanConfirmed = false;
    $scope.plans = [
        {
            id: 1, status: 'Active', careProvider: 'Amir Aly', reason: 'has lot of fats',
            otherConsideration: 'high blood glucose', otherplans: 'Cardiologist (Dr.Beats) has client on plan.',
            planName: 'weight loss', toImprove: 'overall shape', howItsGoing: 'fine \n good',
            firstAcheive: 'lose 10 kg.', firstAction: 'Diet', firstProvider: { name: 'Dr.Mahmoud', email: 'M@mailcom' }, firstWhen: new moment('Oct 30, 2016'),
            secondAcheive: 'improve health', secondAction: 'go to GYM', secondProvider: { name: 'Mr.Nabil', email: 'N@mailcom' }, secondWhen: new moment('Nov 15, 2016')
        },
        {
            id: 2, status: 'Stopped', careProvider: 'Ahmed Alaa', reason: 'has lot of fats222',
            otherConsideration: 'high blood glucose22', otherplans: 'Cardiologist (Dr.Beats) has client on plan 22.',
            planName: 'weight loss 2', toImprove: 'overall shape 2', howItsGoing: 'fine \n good 2',
            firstAcheive: 'lose 10 kg  2.', firstAction: 'Diet 2', firstProvider: { name: 'Dr.Mahmoud 2', email: 'M2@mailcom' }, firstWhen: new moment('Oct 10, 2016'),
            secondAcheive: 'improve health 2', secondAction: 'go to GYM 2', secondProvider: { name: 'Mr.Nabil  2', email: 'N2@mailcom' }, secondWhen: new moment('Nov 20, 2016')
        },
        {
            id: 3, status: 'Not Now', careProvider: 'Saeed AlMasry', reason: 'has lot of fats 3',
            otherConsideration: 'high blood glucose 3', otherplans: 'Cardiologist (Dr.Beats) has client on plan 3.',
            planName: 'weight loss 3', toImprove: 'overall shape 3', howItsGoing: 'fine \n good 3',
            firstAcheive: 'lose 10 kg 3.', firstAction: 'Diet 3', firstProvider: { name: 'Dr.Mahmoud 3 ', email: 'M3@mailcom' }, firstWhen: new moment('Oct 20, 2016'),
            secondAcheive: 'improve health 3', secondAction: 'go to GYM 3', secondProvider: { name: 'Mr.Nabil 3', email: 'N3@mailcom' }, secondWhen: new moment('Nov 20, 2016')
        }
    ];

    $scope.activePlanTab = $stateParams.planid;
    console.log($scope.activePlanTab);
    $scope.activePlan = $scope.plans[$scope.activePlanTab - 1];

 $scope.newPlan = {
            id: 999, status: 'Not Now', careProvider: 'Saeed AlMasry', reason: 'has lot of fats 993',
            otherConsideration: 'high blood glucose 993', otherplans: 'Cardiologist (Dr.Beats) has client on plan 993.',
            planName: 'weight loss 999', toImprove: 'overall shape 993', howItsGoing: 'fine \n good 993',
            firstAcheive: 'lose 10 kg 999.', firstAction: 'Diet 993', firstProvider: { name: 'Dr.Mahmoud 993 ', email: 'M993@mailcom' }, firstWhen: new moment('Oct 20, 2016'),
            secondAcheive: 'improve health 993', secondAction: 'go to GYM 993', secondProvider: { name: 'Mr.Nabil 993', email: 'N9993@mailcom' }, secondWhen: new moment('Nov 20, 2016')
 };

    $scope.createPlan = function () {
        console.log('add');
        $scope.plans.push($scope.newPlan);
        console.log($scope.plans);
        $scope.activePlanTab = 999;
        $stateParams.planid = 999;
        $scope.activePlan = $scope.plans[3];
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
        $scope.activePlanTab = _plan.id;
        $scope.activePlan = _plan;
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
            console.log('eeeeeeee');
        },3000);

    }
});

//console.log($scope.plans[_id].firstWhen);