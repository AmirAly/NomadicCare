ehs.controller("LoginController", function ($scope, $state, $rootScope, API) {
    $scope.loginFormError = false;
    $scope.submit = function (form) {
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
            //$scope.loading = false;
            //$scope.onSubmit = function () {
            //    $scope.loading = true;
            //}

            API.execute(req).then(function (_res) {
                console.log(_res.data);
                if (_res.data.code == 100) { // Provider | coordinator
                    //function login get coordinatorId here
                    $rootScope.currentUser = $scope.txtEmail;
                    $rootScope.currentUserName = 'Adam Mark';
                    $rootScope.userType = 'admin';

                    $scope.showMessage = true;
                    $scope.messageTxt = 'Welcome ...';
                    $scope.messageStatus = 'success';

                    $state.go('clients');
                }
                else if (_res.data.code == 101) { // system admin
                    $rootScope.currentUser = $scope.txtEmail;
                    $rootScope.currentUserName = 'Amir aly';
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
                //$.loader("close");
            }, function (error) {
                $scope.showMessage = true;
                $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
                $scope.messageStatus = 'warning';
            });
        }

    }
});


