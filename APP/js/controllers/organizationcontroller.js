ehs.controller("OrganizationController", function ($scope, $state, $rootScope, $stateParams) {
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
        $scope.speciality = [{ name: '', desc: '' }];
    }
    else {
        //Edit client
        $rootScope.pageHeader = 'Organisation Edit';
        $scope.createMode = false;
        $scope.txtOrganizationName = "Al Motaheda 1";
        $scope.txtOrganizationAddress = "Egypt, Cairo 20 Masr St.";
        $scope.txtPostalCode = "123456";
        $scope.txtPhone = "01245415844";
        $scope.txtMobile = "03510685";
        $scope.txtEmail = "AlMotaheda@mail.com";
        $scope.speciality = [{ name: 'spec 1 ', desc: 'desc 1' }];
    }


    $scope.cancelOrganization = function () {
        $state.go('listorganizations');
    }

    $scope.submit = function (form) {
        angular.forEach($scope.frmAddOrganization.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            $scope.orgObj = {
                OrganizationName: $scope.txtOrganizationName,
                OrganizationAddress: $scope.txtOrganizationAddress,
                PostalCode: $scope.txtPostalCode,
                Phone: $scope.txtPhone,
                Mobile: $scope.txtMobile,
                Email: $scope.txtEmail,
                Speciality: $scope.speciality
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
                    $scope.speciality.push({ name: '', desc: '' });
                }
                $rootScope.DeleteConfirmed = false;
            }
        });
    }

});
