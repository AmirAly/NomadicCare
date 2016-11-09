ehs.controller("ProviderController", function ($scope, $state, $rootScope, $stateParams) {
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
        $scope.speciality = [{ name: '', desc: '' }];
        $scope.practices = [{ name: '' }];
    }
    else {
        //Edit client
        $rootScope.pageHeader = 'Provider Edit';
        $scope.createMode = false;
        $scope.txtProviderName = "Kamelia";
        $scope.txtProviderAddress = "Egypt, Cairo 20 Masr St.";
        $scope.txtPostalCode = "123456";
        $scope.txtPhone = "01245415844";
        $scope.txtMobile = "03510685";
        $scope.txtEmail = "Kamelia@mail.com";
        $scope.speciality = [{ name: 'spec 1 ', desc: 'desc 1' }];
        $scope.practices = [{ name: 'practice 1' }];
    }


    $scope.cancelProvider = function () {
        $state.go('listproviders');
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
                Practice: $scope.practices
            }
            console.log($scope.orgObj);
            console.log('valid');

            $scope.showMessage = true;
            $scope.messageTxt = 'Saved ...';
            $scope.messageStatus = 'success';
        }

    }

    $scope.addSpeciality = function () {
        $scope.speciality.push({ name: '', desc: '' });
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
                    $scope.speciality.push({ name: '', desc: '' });
                }
                $rootScope.DeleteConfirmed = false;
            }
            $rootScope.DeleteConfirmed = false;
        });
    }

    $scope.addPractice = function () {
        $scope.practices.push({ name: '' });
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
                    $scope.practices.push({ name: '' });
                }
                $rootScope.DeleteConfirmed2 = false;
            }
            $rootScope.DeleteConfirmed2 = false;
        });
    }

});
