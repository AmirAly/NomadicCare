ehs.controller("FollowupController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthnotes';
        $rootScope.activetab = 'followup';
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
            angular.element(document.getElementById('txtDateFollowup')).addClass('used');
        });
    }

    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDateFollowup')).addClass('used');
        });
    }

    $('#followupModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $(this).find('#txtDateFollowup').removeClass('used');
    })


    // fill table with data
    var req = {
        method: 'get',
        url: '/HealthNotes/' + $scope.currentClientInfo._id + '/' + 'Followup',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.followup = _res.data.data;
        }
        else {
            $scope.followup = [];
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
        angular.forEach($scope.frmFollowup.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            $scope.followupObj = {
                HNType: 'Followup',
                HNStatus: 1,
                DateRequired: $scope.txtDateFollowup,
                Reason: $scope.txtReason,
                RelatedConsultation: $scope.txtRelatedConsultation,
                Status: $scope.txtStatus,
                Clinician: $scope.txtClinician
            }

            var req = {
                method: 'post',
                url: '/HealthNotes/' + $scope.currentClientInfo._id,
                data: $scope.followupObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.txtDateFollowup = '';
                    $scope.txtReason = '';
                    $scope.txtRelatedConsultation = '';
                    $scope.txtStatus = '';
                    $scope.txtClinician = '';

                    $scope.frmFollowup.$setPristine();
                    $scope.followup.push($scope.followupObj);
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
                $timeout(function () {
                    $('.innerSingleTab').scrollTop(document.body.scrollHeight);
                }, 1500);
            });
        }

    }
});