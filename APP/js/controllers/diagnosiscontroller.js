ehs.controller("DiagnosisController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthnotes';
        $rootScope.activetab = 'diagnosis';
    }, 500);
    console.log($rootScope.activetab);

    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDateDiagnosis')).addClass('used');
        });
    }
    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDateDiagnosis')).addClass('used');
        });
    }

    $('#diagnosisModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $(this).find('#txtDateDiagnosis').removeClass('used');
    })

    // fill table with data
    var req = {
        method: 'get',
        url: '/HealthNotes/' + $scope.currentClientInfo._id + '/' + 'Diagnosis',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.diagnosis = _res.data.data;
        }
        else {
            $scope.diagnosis = [];
        }
        //$scope.loading = false;
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    }).finally(function () {
        $rootScope.loading = false;
    });



    $scope.submit = function (form) {
        angular.forEach($scope.frmDiagnosis.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            $scope.medicationObj = {
                HNType: 'Diagnosis',
                HNStatus: 1,
                DateEntered: $scope.txtDateDiagnosis,
                Diagnosis: $scope.txtDiagnosis,
                Nature: $scope.txtNature,
                Status: $scope.txtStatus,
                Clinician: $scope.txtClinician
            }

            var req = {
                method: 'post',
                url: '/HealthNotes/' + $scope.currentClientInfo._id,
                data: $scope.medicationObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.txtDateDiagnosis = '';
                    $scope.txtDiagnosis = '';
                    $scope.txtNature = '';
                    $scope.txtStatus = '';
                    $scope.txtClinician = '';

                    $scope.frmDiagnosis.$setPristine();
                    $scope.diagnosis.push($scope.medicationObj);
                    $scope.dismiss();

                }
                else {
                    $scope.showMessage = true;
                    $scope.messageTxt = _res.data.data;
                    $scope.messageStatus = 'danger';
                }
                //$scope.loading = false;
            }, function (error) {
                $scope.showMessage = true;
                $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                $scope.messageStatus = 'warning';
            }).finally(function () {
                $rootScope.loading = false;
            });
        }

    }
});