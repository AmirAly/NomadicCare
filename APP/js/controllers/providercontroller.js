ehs.controller("ProviderController", function ($scope, $state, $rootScope,$timeout, $stateParams, API) {
    console.log($stateParams.providerid);
    $scope.txtSMS = false;
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
        $rootScope.pageHeader = 'Provider Edit';
        $scope.createMode = false;

        // get curret client
        var req = {
            method: 'get',
            url: '/Coordinator/' + $stateParams.providerid,
            data: {}
        }
        ////loader
        $rootScope.loading = true;

        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                console.log(_res.data.data[0].Name);
                $scope.txtProviderName = _res.data.data[0].Name;
                $scope.txtProviderAddress = _res.data.data[0].Location;
                $scope.txtPostalCode = _res.data.data[0].PostalCode;
                $scope.txtPhone = _res.data.data[0].Phone;
                $scope.txtMobile = _res.data.data[0].Mobile;
                $scope.txtEmail = _res.data.data[0].Email;
                $scope.speciality = _res.data.data[0].Speciality;
                $scope.practices = _res.data.data[0].Practice;
                if (_res.data.data[0].SmsNotificationsEnabled == "false" || _res.data.data[0].SmsNotificationsEnabled == false)
                    $scope.txtSMS = false;
                else $scope.txtSMS = true;
                $scope.Password = _res.data.data[0].Password;
                $scope.Status = _res.data.data[0].Status;
                $scope.Img = _res.data.data[0].Img;
            }
            else {
                $scope.showMessage = true;
                $scope.messageTxt = 'No Such Provider ...';
                $scope.messageStatus = 'warning';
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


    $scope.cancelProvider = function () {
        $state.go('listproviders', { orgid: $stateParams.orgid });
    }

    $scope.submit = function (form) {
        console.log($scope.frmAddProvider);
        angular.forEach($scope.frmAddProvider.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            ////loader
            $rootScope.loading = true;
            if ($scope.createMode == true) {
                $scope.orgObj = {
                    Name: $scope.txtProviderName,
                    Location: $scope.txtProviderAddress,
                    PostalCode: $scope.txtPostalCode,
                    Phone: $scope.txtPhone,
                    Mobile: $scope.txtMobile,
                    Email: $scope.txtEmail,
                    Speciality: $scope.speciality,
                    Practice: $scope.practices,
                    SmsNotificationsEnabled: $scope.txtSMS,
                    Organization: $stateParams.orgid,
                    _id: null,
                    //DateOfBirth: '',
                    //Gender: '',
                    RetrivalCode: $scope.txtEmail + '12345',
                    Img: "",
                    Status: 'Pending',
                    Password: '12345'
                }
                var req = {
                    method: 'post',
                    url: '/Coordinator',
                    data: $scope.orgObj
                }



                API.execute(req).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) { // Provider | coordinator
                        $scope.showMessage = true;
                        $scope.messageTxt = 'Provider has been created';
                        $scope.messageStatus = 'success';
                        $scope.frmAddProvider.$setPristine();
                    }

                    else {
                        $scope.showMessage = true;
                        $scope.messageTxt = _res.data.data;
                        $scope.messageStatus = 'danger';
                    }

                }, function (error) { // another error may be connection error
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                    $scope.messageStatus = 'warning';
                }).finally(function () {
                    $rootScope.loading = false;
                    $timeout(function () {
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 1500);
                });
            }
            else { //edit mode
                $scope.orgObj = {
                    Name: $scope.txtProviderName,
                    Location: $scope.txtProviderAddress,
                    PostalCode: $scope.txtPostalCode,
                    Phone: $scope.txtPhone,
                    Mobile: $scope.txtMobile,
                    Email: $scope.txtEmail,
                    Speciality: $scope.speciality,
                    Practice: $scope.practices,
                    SmsNotificationsEnabled: $scope.txtSMS,
                    Organization: $stateParams.orgid,
                    _id: $stateParams.providerid,
                    //DateOfBirth: '',
                    //Gender: '',
                    //RetrivalCode: '',
                    Img: $scope.Img,
                    Status: $scope.Status,
                    Password: $scope.Password
                }
                var req = {
                    method: 'put',
                    url: '/Coordinator',
                    data: $scope.orgObj
                }
                console.log($scope.orgObj);
                API.execute(req).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) { // Provider | coordinator
                        $scope.showMessage = true;
                        $scope.messageTxt = 'Provider has been updated';
                        $scope.messageStatus = 'success';
                        $scope.frmAddProvider.$setPristine();
                    }

                    else {
                        $scope.showMessage = true;
                        $scope.messageTxt = _res.data.data;
                        $scope.messageStatus = 'danger';
                    }

                }, function (error) { // another error may be connection error
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                    $scope.messageStatus = 'warning';
                }).finally(function () {
                    $rootScope.loading = false;
                    $timeout(function () {
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 1500);
                });
            }


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
                $scope.showMessage = true;
                $scope.messageTxt = 'You have to click save button to save the change you made in speciality table.';
                $scope.messageStatus = 'warning';
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
                $scope.showMessage = true;
                $scope.messageTxt = 'You have to click save button to save the change you made in practice table.';
                $scope.messageStatus = 'warning';
            }
            $rootScope.DeleteConfirmed2 = false;
        });
    }

});
