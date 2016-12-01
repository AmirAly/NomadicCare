ehs.controller("ProviderdetailsController", function ($scope, $state, $rootScope, $stateParams, $timeout, API) {
    var BaseImg64;
    //BaseImg64 = 'data:image/jpeg;base64,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';
    console.log($stateParams.providerid);
    if ($stateParams.providerid == "") {
        $location.path("/login");
    }
    else {
        $rootScope.pageHeader = 'Provider Edit';
        // get curret Provider
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
                $scope.providerId = _res.data.data[0]._id;
                $scope.txtProviderName = _res.data.data[0].Name;
                if (_res.data.data[0].Gender == null)
                    $scope.cmbGender = '0';
                else $scope.cmbGender = _res.data.data[0].Gender;
                $scope.txtClinicName = _res.data.data[0].ClinicName;
                if (_res.data.data[0].Img == null || _res.data.data[0].Img == "") {
                    BaseImg64 = 'data:image/jpeg;base64,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';
                    $scope.userImg = BaseImg64;
                }
                else {
                    $scope.userImg = _res.data.data[0].Img;
                    BaseImg64 = _res.data.data[0].Img;
                }
                $scope.txtMobile = _res.data.data[0].Mobile;
                $scope.txtEmail = _res.data.data[0].Email;
                $scope.txtDob = _res.data.data[0].DateOfBirth; //new moment("Jan 14, 2009");
                $scope.speciality = _res.data.data[0].Speciality;
                // to save unchangable data
                $scope.Location = _res.data.data[0].Location;
                $scope.PostalCode = _res.data.data[0].PostalCode;
                $scope.Phone = _res.data.data[0].Phone;
                $scope.Practice = _res.data.data[0].Practice;
                $scope.SmsNotificationsEnabled = _res.data.data[0].SmsNotificationsEnabled;
                $scope.RetrivalCode = _res.data.data[0].RetrivalCode;
                $scope.Status = _res.data.data[0].Status;
                $scope.Password = _res.data.data[0].Password;

                // get provider plans
                var req = {
                    method: 'get',
                    url: '/CarePlans/' + $stateParams.orgid,
                    data: {}
                }
                ////loader
                $rootScope.loading = true;

                API.execute(req).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) {
                        $scope.careplans = [];
                        $scope.plans = [];
                        $scope.result = _res.data.data;

                        var req2 = {
                            method: 'get',
                            url: '/Coordinator/List/' + $stateParams.orgid,
                            data: {}
                        }
                        API.execute(req2).then(function (_res) {
                            console.log(_res.data);
                            if (_res.data.code == 100) {
                                $scope.providers = _res.data.data;
                            }
                            else {
                                $scope.providers = [];
                            }
                        })
                           .finally(function () {
                               for (var i = 0; i < $scope.result.length; i++) {
                                   for (var j = 0; j < $scope.result[i].CarePlans.length; j++) {
                                       var _providerName;
                                       var _providerImg;
                                       for (var k = 0; k < $scope.providers.length; k++) {
                                           if ($scope.providers[k]._id == $scope.result[i].CarePlans[j].Provider) {
                                               _providerName = $scope.providers[k].Name;
                                               _providerImg = $scope.providers[k].Img;
                                           }
                                       }
                                       if ($scope.result[i].CarePlans[j].Provider == $stateParams.providerid) {
                                           $scope.careplans.push({
                                               clientId: $scope.result[i]._id,
                                               clientName: $scope.result[i].FirstName + " " + $scope.result[i].LastName,
                                               clientImg: $scope.result[i].Img,
                                               providerId: $scope.result[i].CarePlans[j].Provider,
                                               providerName: _providerName,
                                               providerImg: _providerImg,
                                               planId: $scope.result[i].CarePlans[j]._id,
                                               planName: $scope.result[i].CarePlans[j].PlanName,
                                               planStatus: $scope.result[i].CarePlans[j].Status,
                                               lastUpdated: $scope.result[i].CarePlans[j].LastUpdated,
                                           });
                                       }
                                   }
                               }
                               console.log($scope.careplans);
                               
                           });
                    }
                    else {
                        $scope.careplans = [];
                    }
                });
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

    $scope.cancelProvider = function () {
        $state.go('listproviders', { orgid: $stateParams.orgid });
    }

    $scope.submit = function (form) {
        angular.forEach($scope.frmAddProvider.$error.required, function (field) {
            field.$setDirty();
        });
        var img = document.getElementById("imgClient");
        BaseImg64 = img.src;
        if (form.$valid) {
            ////loader
            $rootScope.loading = true;
            $scope.orgObj = {
                Name: $scope.txtProviderName,
                Gender: $scope.cmbGender,
                ClinicName: $scope.txtClinicName,
                Img: BaseImg64,
                Mobile: $scope.txtMobile,
                Email: $scope.txtEmail,
                DateOfBirth: $scope.txtDob,
                Speciality: $scope.speciality,
                Organization: $stateParams.orgid,
                _id: $stateParams.providerid,

                Location: $scope.Location,
                PostalCode: $scope.PostalCode,
                Phone: $scope.Phone,
                Practice: $scope.Practice,
                SmsNotificationsEnabled: $scope.SmsNotificationsEnabled,
                RetrivalCode: $scope.RetrivalCode,
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


    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDob')).addClass('used');
        });
    }

    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDob')).addClass('used');
        });
    }

    //img uploader

    $scope.ShowFileSelector = function () {
        if (navigator && navigator.camera) {
            $('#libModal').modal('show');
        }
        else {
            var fileuploader = angular.element("#uploadClientImage");
            fileuploader.trigger('click');
        }
    }

    $scope.ImgSource = function () {
        $('.modal').modal('hide');
        if (navigator && navigator.camera) {
            navigator.camera.getPicture(uploadPhoto, null, {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                quality: 50,
                targetWidth: 140,
                targetHeight: 140,
                destinationType: Camera.DestinationType.DATA_URL,
                correctOrientation: true
            });
        }
        else {
            $('#uploadClientImage').click();
        }
        $('#libModal').modal('hide');
    }

    $scope.CamSource = function () {
        $('.modal').modal('hide');
        if (navigator && navigator.camera) {
            navigator.camera.getPicture(uploadPhoto, null, {
                sourceType: Camera.PictureSourceType.CAMERA,
                quality: 50,
                targetWidth: 140,
                targetHeight: 140,
                destinationType: Camera.DestinationType.DATA_URL,
                correctOrientation: true
            });
        }
        else {
            $('#uploadClientImage').click();
        }
        $('#libModal').modal('hide');
    }
});

function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadClientImage").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImage(BaseImg64);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}

function UploadImage(_BaseImg64) {
    $('#imgClient').attr('src', _BaseImg64);
    var img = document.getElementById("imgClient");
    //console.log(img.src);
    var newImg = imageToDataUri(img, 150, 150);
    $('#imgClient').attr('src', newImg);
    BaseImg64 = img.src;
    //console.log(BaseImg64);
}

function imageToDataUri(img, width, height) {
    // create an off-screen canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}

//function uploadPhoto(data) {
//    if (data.indexOf('base64') < 0) {
//        $('#imgClient').attr('src', 'data:image/jpeg;base64,' + data);
//    }
//    else {
//        $('#imgClient').attr('src', data);
//    }
//    BaseImg64 = data;
//}