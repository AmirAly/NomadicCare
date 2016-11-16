ehs.controller("MedicationsController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    console.log($scope.currentClientInfo);
    //console.log($scope.currentClientInfo.HealthNotes);
    //console.log($scope.currentClientInfo.HealthNotes);// type madication

    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDateMedication')).addClass('used');
        });
    }

    // fill table with data
    var req = {
        method: 'get',
        url: '/HealthNotes/' + $scope.currentClientInfo._id + '/' + 'Medication',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.medications = _res.data.data;
        }
        else {
            $scope.medications = [];
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
        angular.forEach($scope.frmMedications.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            $scope.medicationObj = {
                HNType: 'Medication',
                HNStatus:1,
                DatePrescribed: $scope.txtDateMedication,
                Description: $scope.txtDescription,
                Type: $scope.txtType,
                Indication: $scope.txtIndication,
                Status: $scope.txtStatus,
                RelatedConsultation: $scope.txtRelatedConsultation
            }

            var req = {
                method: 'post',
                url: '/HealthNotes/' + $scope.currentClientInfo._id ,
                data: $scope.medicationObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.dismiss();
                    $scope.frmMedications.$setPristine();
                    $scope.medications.push($scope.medicationObj);
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
ehs.directive('myModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss = function () {
                element.modal('hide');
            };
        }
    }
});