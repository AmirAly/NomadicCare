ehs.controller("LoginController", function ($scope, $state, $rootScope) {
    $scope.loginFormError = false;
    $scope.submit = function () {
        angular.forEach($scope.frmLogin.$error.required, function (field) {
                field.$setDirty();
            });

        if ($scope.txtEmail == "admin@ehs.com" && $scope.txtPassword == "123456789") {
            //function login get coordinatorId here
            $rootScope.currentUser = $scope.txtEmail;
            $rootScope.currentUserName = 'Adam Mark';
            $rootScope.userType = 'admin';

            $scope.showMessage = true;
            $scope.messageTxt = 'Welcome ...';
            $scope.messageStatus = 'success';

            $state.go('clients');
        }
        else if ($scope.txtEmail == "system@ehs.com" && $scope.txtPassword == "123456789") {
            $rootScope.currentUser = $scope.txtEmail;
            $rootScope.currentUserName = 'Amir aly';
            $rootScope.userType = 'system';

            $scope.showMessage = true;
            $scope.messageTxt = 'Welcome ...';
            $scope.messageStatus = 'success';

            $state.go('listorganizations');
        }
        else {
            $scope.loginFormError = true;
            $scope.showMessage = true;
            $scope.messageTxt = 'Wrong user name or password ...';
            $scope.messageStatus = 'danger';
            
        }
    }
});


