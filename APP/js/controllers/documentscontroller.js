ehs.controller("DocumentsController", function ($scope, $state, $rootScope, $stateParams, API, $timeout) {
    $timeout(function () {
        console.log($scope.currentClientInfo);
        $rootScope.activeoutertab = 'healthnotes';
        $rootScope.activetab = 'documents';
    }, 500);
    console.log($rootScope.activetab);

    $scope.showFileSelector = function () {
        console.log('enter');
        var fileuploader = angular.element("#uploadDocumentFile");
        fileuploader.trigger('click');
    }

    $scope.fileAttached = "";
    var filename;
    $scope.fileSelected = function (element) {
        $scope.fileAttached = element.files[0];
        console.log(element.files[0]);
        r = new FileReader();
        r.onloadend = function (e) {
            $scope.fileAttached = e.target.result;
            //console.log($scope.fileAttached);
            filename = document.getElementById('uploadDocumentFile').value;
            var lastIndex = filename.lastIndexOf("\\");
            if (lastIndex >= 0) {
                filename = filename.substring(lastIndex + 1);
            }
        }
        r.readAsDataURL($scope.fileAttached);

    };


    // date picker settings
    $scope.datepickerconfigurations = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdown'
    };

    $scope.onTimeSet = function (_newDate, _oldDate) {
        console.log(_newDate);
        $timeout(function () {
            angular.element(document.getElementById('txtDateDocument')).addClass('used');
        });
    }

    $scope.setDateToTodayUI = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtDateDocument')).addClass('used');
        });
    }

    $('#documentsModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $(this).find('#txtDateDocument').removeClass('used');
    })

    // fill table with data
    var req = {
        method: 'get',
        url: '/HealthNotes/' + $scope.currentClientInfo._id + '/' + 'Document',
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.documents = _res.data.data;
        }
        else {
            $scope.documents = [];
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
        angular.forEach($scope.frmDocuments.$error.required, function (field) {
            field.$setDirty();
        });

        if (form.$valid) {
            console.log('valid');
            $scope.documentObj = {
                HNType: 'Document',
                HNStatus: 1,
                DateEntered: $scope.txtDateDocument,
                Description: $scope.txtDescription,
                DocumentName: $scope.txtDocumentName,
                Status: $scope.txtStatus,
                SourceOrganisations: $scope.txtSourceOrganisations,
                File: $scope.fileAttached,
                FileName: filename
            }

            var req = {
                method: 'post',
                url: '/HealthNotes/' + $scope.currentClientInfo._id,
                data: $scope.documentObj
            }
            $rootScope.loading = true;

            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $scope.txtDateDocument = '';
                    $scope.txtDescription = '';
                    $scope.txtDocumentName = '';
                    $scope.txtStatus = '';
                    $scope.txtSourceOrganisations = '';
                    $scope.fileAttached = '';

                    $scope.frmDocuments.$setPristine();
                    $scope.documents.push($scope.documentObj);
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