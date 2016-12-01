ehs.controller("LaboratoryController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthnotes';
        $rootScope.activetab = 'laboratories';
    }, 500);
    console.log($rootScope.activetab);


    $scope.showFileSelector = function () {
        console.log('enter');
        var fileuploader = angular.element("#uploadLaboratoryNotes");
        fileuploader.trigger('click');
    }

    $scope.fileAttached = "";

    $scope.fileSelected = function (element) {
        $scope.fileAttached = element.files[0];
        console.log(element.files[0]);
             r = new FileReader();
            r.onloadend = function (e) {
                $scope.fileAttached = e.target.result;
                console.log($scope.fileAttached);
            }
            r.readAsBinaryString($scope.fileAttached);
    };

    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDateLaboratory')).addClass('used');
        });
    }

    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDateLaboratory')).addClass('used');
        });
    }

    $('#laboratoriesModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $(this).find('input').removeClass('used');
    })

    // fill table with data
    var req = {
        method: 'get',
        url: '/HealthNotes/' + $scope.currentClientInfo._id + '/' + 'Laboratory',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.laboratories = _res.data.data;
        }
        else {
            $scope.laboratories = [];
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
        angular.forEach($scope.frmLaboratories.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');

                $scope.laboratoryObj = {
                    HNType: 'Laboratory',
                    HNStatus: 1,
                    DateEntered: $scope.txtDateLaboratory,
                    Notes: $scope.txtNotes,
                    Type: $scope.txtType,
                    Status: $scope.txtStatus,
                    Organisation: $scope.txtOrganisation,
                    File: $scope.fileAttached
                }
                console.log($scope.laboratoryObj);
                var req = {
                    method: 'post',
                    url: '/HealthNotes/' + $scope.currentClientInfo._id,
                    data: $scope.laboratoryObj
                }
                $rootScope.loading = true;

                API.execute(req).then(function (_res) {
                    console.log(_res);
                    if (_res.data.code == 100) {
                        $scope.dismiss();
                        $scope.frmLaboratories.$setPristine();
                        $scope.laboratories.push($scope.laboratoryObj);
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
                    $timeout(function () {
                        $('.innerSingleTab').scrollTop(document.body.scrollHeight);
                    }, 1500);
                });
            
        }

    }
});