﻿ehs.controller("OrganizationController", function ($scope, $state, $rootScope, $stateParams, API, $window) {
    console.log($stateParams.orgid);
    if ($stateParams.orgid == "") {
        // Create client
        $scope.createMode = true;
        $rootScope.pageHeader = 'Organisation Create';
        $scope.txtOrganizationName = "";
        $scope.txtOrganizationAddress = "";
        $scope.txtPostalCode = "";
        $scope.txtPhone = "";
        $scope.txtMobile = "";
        $scope.txtEmail = "";
        $scope.speciality = [{ Name: '', Description: '' }];
    }
    else {
        //Edit client
        var req = {
            method: 'get',
            url: '/Organization/' + $stateParams.orgid,
            data: {}
        }
        ////loader
        //$scope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $rootScope.pageHeader = 'Organisation Edit';
                $scope.createMode = false;
                $scope.txtOrganizationName = _res.data.data.Name;
                $scope.txtOrganizationAddress = _res.data.data.Location;
                $scope.txtPostalCode = _res.data.data.PostalCode;
                $scope.txtPhone = _res.data.data.Phone;
                $scope.txtMobile = _res.data.data.Mobile;
                $scope.txtEmail = _res.data.data.Email;
                $scope.speciality = _res.data.data.Speciality;
                $scope.txtSMS = _res.data.data.SmsNotificationsEnabled;
            }
            else {
                $rootScope.pageHeader = 'Organisation Edit';
                $scope.createMode = false;
                $scope.showMessage = true;
                $scope.messageTxt = 'No Such Organisation ...';
                $scope.messageStatus = 'warning';
            }
            //$scope.loading = false;
        }, function (error) {
            $scope.showMessage = true;
            $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            $scope.messageStatus = 'warning';
        });

    }


    $scope.cancelOrganization = function () {
        $state.go('listorganizations');
    }

    $scope.showlistProvidersSystem = function () {
        $state.go('listproviderssystem', { orgid: $stateParams.orgid });
    }

    $scope.submit = function (form) {
        $scope.showMessage = false;
        angular.forEach($scope.frmAddOrganization.$error.required, function (field) {
            field.$setDirty();
        });
        console.log($scope.createMode);
        if (form.$valid) {

            ////loader
            //$scope.loading = true;
            $scope.orgObj = {
                Name: $scope.txtOrganizationName,
                Location: $scope.txtOrganizationAddress,
                PostalCode: $scope.txtPostalCode,
                Phone: $scope.txtPhone,
                Mobile: $scope.txtMobile,
                Email: $scope.txtEmail,
                Speciality: $scope.speciality,
                SmsNotificationsEnabled: $scope.txtSMS,
                _id: $stateParams.orgid
            }
            console.log($scope.orgObj);
            if ($scope.createMode == true) {
                console.log('create Mode');
                var req = { // create
                    method: 'post',
                    url: '/Organization',
                    data: $scope.orgObj
                }

                API.execute(req).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) {
                        $scope.showMessage = true;
                        $scope.messageTxt = 'Saved ...';
                        $scope.messageStatus = 'success';
                        $state.go('listorganizations');
                    }
                    else {
                        $scope.showMessage = true;
                        $scope.messageTxt = 'Organization Already Exist ...';
                        $scope.messageStatus = 'danger';
                    }
                    //$scope.loading = false;
                }, function (error) {
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                    $scope.messageStatus = 'warning';
                });

            }
            else { // edit
                console.log('edit Mode');
                var req = {
                    method: 'put',
                    url: '/Organization',
                    data: $scope.orgObj
                }
                API.execute(req).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) {
                        $scope.showMessage = true;
                        $scope.messageTxt = 'Saved ...';
                        $scope.messageStatus = 'success';
                        $state.go('listorganizations');
                    }
                    else {
                        $scope.showMessage = true;
                        $scope.messageTxt = 'Organization Not Exist ...';
                        $scope.messageStatus = 'danger';
                    }
                    //$scope.loading = false;
                }, function (error) {
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                    $scope.messageStatus = 'warning';
                });
            }
        }
    }

    $scope.addSpeciality = function () {
        $scope.speciality.push({ Name: '', Description: '' });
    }

    $scope.deleteSpeciality = function (_spec) {
        $('#confirmationModal').modal('show');
        console.log($rootScope.DeleteConfirmed);
        $rootScope.$watch('$root.DeleteConfirmed', function () {
            if ($rootScope.DeleteConfirmed == true) {
                // If Delete Confirmed Do ...
                var index = $scope.speciality.indexOf(_spec);
                $scope.speciality.splice(index, 1);
                console.log($scope.speciality);
                if ($scope.speciality.length == 0) { // if no speciality add empty row
                    $scope.speciality.push({ Name: '', Description: '' });
                }
                $rootScope.DeleteConfirmed = false;
            }
        });
    }


    //var win = $window;
    //$scope.$watch('frmAddOrganization.$dirty', function (value) {
    //    if (value) {
    //        win.onbeforeunload = function () {
    //            return 'Your message here';
    //        };
    //    }
    //});
    //$scope.$on("$destroy", function () {
    //    alert('out');
    //    //window.onbeforeunload = function () {
    //    //    return "Your text string you want displayed in the box";
    //    //}

    //    //var win = $window;
    //    //$scope.$watch('frmAddOrganization.$dirty', function (value) {
    //    //    if (value) {
    //    //        win.onbeforeunload = function () {
    //    //            return 'Your message here';
    //    //        };
    //    //    }
    //    //});
    //});

});