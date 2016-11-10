ehs.controller("providerssystemController", function ($scope, $state, $rootScope, $stateParams, API) {
    $rootScope.pageHeader = '';
    console.log($stateParams.providerid);

    if ($stateParams.providerid == "") {
        // Create client
        $scope.createMode = true;
        $rootScope.pageHeader = 'Provider Create';
        $scope.txtProviderName = "";
        $scope.txtProviderAddress = "";
        $scope.txtPostalCode = "";
        $scope.txtPhone = "";
        $scope.txtMobile = "";
        $scope.txtEmail = "";
        $scope.speciality = [{ Name: '', Description: '' }];
        $scope.practices = [{ Name: '', Description: '' }];
    }
    else {
        //Edit client
        var req = {
            method: 'get',
            url: '/Coordinator/' + $stateParams.orgid,
            data: {}
        }
        ////loader
        //$scope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $rootScope.pageHeader = 'Provider Edit';
                $scope.createMode = false;
                $scope.txtProviderName = _res.data.data.Name;
                $scope.txtProviderAddress = _res.data.data.Location;
                $scope.txtPostalCode = _res.data.data.PostalCode;
                $scope.txtPhone = _res.data.data.Phone;
                $scope.txtMobile = _res.data.data.Mobile;
                $scope.txtEmail = _res.data.data.Email;
                $scope.speciality = _res.data.data.Speciality;
                $scope.practices = _res.data.data.Practice;
                $scope.txtSMS = _res.data.data.SmsNotificationsEnabled;
            }
            else {
                $rootScope.pageHeader = 'Provider Edit';
                $scope.createMode = false;
                $scope.showMessage = true;
                $scope.messageTxt = 'No Such Provider ...';
                $scope.messageStatus = 'warning';
            }
            //$scope.loading = false;
        }, function (error) {
            $scope.showMessage = true;
            $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            $scope.messageStatus = 'warning';
        });
    }


    $scope.cancelProvider = function () {
        $state.go('listproviderssystem', { orgid: $stateParams.orgid });
    }

    $scope.submit = function (form) {
        angular.forEach($scope.frmAddProvider.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            $scope.orgObj = {
                ProviderName: $scope.txtProviderName,
                ProviderAddress: $scope.txtProviderAddress,
                PostalCode: $scope.txtPostalCode,
                Phone: $scope.txtPhone,
                Mobile: $scope.txtMobile,
                Email: $scope.txtEmail,
                Speciality: $scope.speciality,
                Practice: $scope.practices,
                SmsNotificationsEnabled: $scope.txtSMS,
                Organization: $stateParams.orgid,
                _id: $stateParams.providerid
            }
            console.log($scope.orgObj);
            console.log('valid');

            $scope.showMessage = true;
            $scope.messageTxt = 'Saved ...';
            $scope.messageStatus = 'success';
        }

    }
    
    $scope.addSpeciality = function () {
        $scope.speciality.push({ Name: '', Description: '' });
    }

    $scope.deleteSpeciality = function (_spec, _type) {
        console.log(_spec);
        $('#confirmationModal').modal('show');
        console.log($rootScope.DeleteConfirmed);
        $rootScope.$watch('$root.DeleteConfirmed', function () {
            if ($rootScope.DeleteConfirmed == true && _type === 'speciality') {
                console.log(_type);
                // If Delete Confirmed Do ...
                var index = $scope.speciality.indexOf(_spec);
                $scope.speciality.splice(index, 1);
                console.log($scope.speciality);
                if ($scope.speciality.length == 0) { // if no speciality add empty row
                    $scope.speciality.push({ Name: '', Description: '' });
                }
                $rootScope.DeleteConfirmed = false;
            }
            $rootScope.DeleteConfirmed = false;
        });
    }

    $scope.addPractice = function () {
        $scope.practices.push({ Name: '', Description: '' });
    }

    $scope.deletePractice = function (_practice, _type) {
        console.log(_practice);
        $('#confirmationModal2').modal('show');
        console.log($rootScope.DeleteConfirmed2);
        $rootScope.$watch('$root.DeleteConfirmed2', function () {
            if ($rootScope.DeleteConfirmed2 == true && _type === 'practice') {
                console.log(_type);
                // If Delete Confirmed Do ...
                var index = $scope.practices.indexOf(_practice);
                $scope.practices.splice(index, 1);
                console.log($scope.practices);
                if ($scope.practices.length == 0) { // if no practice add empty row
                    $scope.practices.push({ Name: '', Description: '' });
                }
                $rootScope.DeleteConfirmed2 = false;
            }
            $rootScope.DeleteConfirmed2 = false;
        });
    }

});