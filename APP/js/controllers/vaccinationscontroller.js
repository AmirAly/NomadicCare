ehs.controller("VaccinationsController", function ($scope, $state, $rootScope, $stateParams , API, $timeout) {
    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthnotes';
        $rootScope.activetab = 'vaccinations';
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
            angular.element(document.getElementById('txtDateVaccination')).addClass('used');
        });
    }
    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDateVaccination')).addClass('used');
        });
    }

    $('#vaccinationsModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $(this).find('input').removeClass('used');
    })

    // fill table with data
    var req = {
        method: 'get',
        url: '/HealthNotes/' + $scope.currentClientInfo._id + '/' + 'Vaccination',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.vaccinations = _res.data.data;
        }
        else {
            $scope.vaccinations = [];
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
        angular.forEach($scope.frmVaccinations.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            $scope.vaccinationObj = {
                HNType: 'Vaccination',
                HNStatus: 1,
                DateAdministreted: $scope.txtDateVaccination,
                Description: $scope.txtDescription,
                Type: $scope.txtType,
                Brand: $scope.txtBrand,
                Status: $scope.txtStatus,
                Clinician: $scope.txtClinician
            }

            var req = {
                method: 'post',
                url: '/HealthNotes/' + $scope.currentClientInfo._id,
                data: $scope.vaccinationObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.dismiss();
                    $scope.frmVaccinations.$setPristine();
                    $scope.vaccinations.push($scope.vaccinationObj);
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