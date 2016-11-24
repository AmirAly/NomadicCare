ehs.controller("ConsultationnotesController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'consultationnotes';
    }, 500);

    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDate')).addClass('used');
        });
    }
    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDate')).addClass('used');
        });
    }

    $('#consultationnotesModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $(this).find('#txtDate').removeClass('used');
    })
    // fill table with data
    var req = {
        method: 'get',
        url: '/ConsultationNotes/' + $scope.currentClientInfo._id ,
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.notes = _res.data.data;
        }
        else {
            $scope.notes = [];
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
        angular.forEach($scope.frmConsultationnotes.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            if ($scope.txtResolved == true)
                $scope.status = 0;
            else $scope.status = 1;
            $scope.notesObj = {
                Date: $scope.txtDate,
                ClinicalReason: $scope.txtClinicalReason,
                Examination: $scope.txtExamination,
                Treatment: $scope.txtTreatment,
                Status: $scope.status,
                Type: 'Consultation Notes'
            }


            var req = {
                method: 'post',
                url: '/ConsultationNotes/' + $scope.currentClientInfo._id,
                data: $scope.notesObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.txtDate = '';
                    $scope.txtClinicalReason = '';
                    $scope.txtExamination = '';
                    $scope.txtTreatment = '';
                    $scope.status = 0;

                    $scope.frmConsultationnotes.$setPristine();
                    $scope.notes.push($scope.notesObj);
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