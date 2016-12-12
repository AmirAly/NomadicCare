ehs.controller("LoginController", function ($scope, $state, $rootScope, API, $timeout, $stateParams) {
    $scope.loginFormError = false;
    console.log($stateParams.confirmationcode);
    console.log($stateParams);

    if ($stateParams.confirmationcode == "" || $stateParams.confirmationcode == null || $stateParams.confirmationcode == '0') {
        // there is no confirmation
        console.log('if');
        $scope.hidelogin = false;
    }
    else {
        // confirmation required
        console.log('else');
        $scope.hidelogin = true;
        var req = {
            method: 'get',
            url: '/Coordinator/Confirm/' + $stateParams.confirmationcode,
            data: {}
        }
        ////loader
        $rootScope.loading = true;
        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                //Account Activaed
                $scope.showMessage2 = true;
                $scope.messageTxt = 'Account Activaed , Please Login With Email And Password That You receieved';
                $scope.messageStatus = 'success';
                $timeout(function () {
                    $scope.hidelogin = false;
                }, 1500);

            }
            else if (_res.data.code == 101) {
                // Account Already Activated
                $scope.showMessage2 = true;
                $scope.messageTxt = 'Account Already Activaed , Please Login With Email And Password That You receieved';
                $scope.messageStatus = 'warning';
                $timeout(function () {
                    $scope.hidelogin = false;
                }, 1500);
            }
            else if (_res.data.code == 20) {
                // Account Already Activated
                $scope.showMessage2 = true;
                $scope.messageTxt = 'No Such User';
                $scope.messageStatus = 'danger';
            }
            else { // another error may be connection error
                $scope.showMessage2 = true;
                $scope.messageTxt = 'Error Happened , Please Try Again ...';
                $scope.messageStatus = 'danger';
            }
        }, function (error) {
            $scope.showMessage2 = true;
            $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
            $scope.messageStatus = 'warning';
        })
        .finally(function () {
            $rootScope.loading = false;
        });
    }





    $scope.submit = function (form) {
        $scope.showMessage = false;
        angular.forEach($scope.frmLogin.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            var req = {
                method: 'post',
                url: '/Login',
                data: {
                    Email: $scope.txtEmail,
                    Password: $scope.txtPassword
                }
            }
            ////loader
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res.data);
                if (_res.data.code == 100) { // Provider | coordinator
                    //function login get coordinatorId here
                    $rootScope.currentProviderId = _res.data.data._id;
                    $rootScope.currentProviderName = _res.data.data.Name;
                    $rootScope.OrganizationId = _res.data.data.Organization;
                    $rootScope.userType = 'admin';

                    $scope.showMessage = true;
                    $scope.messageTxt = 'Welcome ...';
                    $scope.messageStatus = 'success';

                    $state.go('clients');
                }
                else if (_res.data.code == 101) { // system admin
                    $rootScope.currentProviderName = 'System Admin';
                    $rootScope.OrganizationId = 1000;
                    $rootScope.userType = 'system';

                    $scope.showMessage = true;
                    $scope.messageTxt = 'Welcome ...';
                    $scope.messageStatus = 'success';

                    $state.go('listorganizations');
                }
                else if (_res.data.code == 21) { // Email not confirmed
                    $scope.showMessage = true;
                    $scope.messageTxt = 'This Email Is Not Confirmed ...';
                    $scope.messageStatus = 'danger';
                }
                else if (_res.data.code == 20) { // user not exist
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Incorrect Login Information ...';
                    $scope.messageStatus = 'danger';
                }
                else { // another error may be connection error
                    $scope.showMessage = true;
                    $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                    $scope.messageStatus = 'warning';
                }
            }, function (error) {
                $scope.showMessage = true;
                $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                $scope.messageStatus = 'warning';
            })
            .finally(function () {
                $rootScope.loading = false;
            });
        }

    }
});


