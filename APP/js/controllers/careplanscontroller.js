﻿ehs.controller("CareplansController", function ($scope, $state, $rootScope, $stateParams, $timeout, API, $location) {
    $rootScope.EditPlanConfirmed = false;
    $timeout(function () {
        $rootScope.activeoutertab = 'careplans';
        console.log($scope.currentClientInfo.CarePlans);
        $scope.plans = $scope.currentClientInfo.CarePlans;
        if ($scope.currentClientInfo.CarePlans.length != 0) {
            if ($stateParams.planid == "" || $stateParams.planid == 'undefined') {
                console.log('if');
                $scope.activePlanTab = $scope.plans[0]._id;
                $scope.activePlan = $scope.plans[0];
                $location.path('/healthrecord/careplans/' + $scope.plans[0]._id);
            }
            else { // certain plan
                console.log('else');
                console.log($stateParams.planid);
                $scope.activePlanTab = $stateParams.planid;
                for (var i = 0; i < $scope.plans.length; i++) {
                    if ($scope.plans[i]._id == $stateParams.planid) {
                        $scope.activePlanTab = $scope.plans[i]._id;
                        $scope.activePlan = $scope.plans[i];
                        //$location.path('/healthrecord/careplans/' + $scope.plans[i]._id);
                        //$state.reload();

                    }
                }
            }
        }
    }, 1000);

    // get all providers
    var req = {
        method: 'get',
        url: '/Coordinator/List/' + $rootScope.OrganizationId,
        data: {}
    }
    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.providers = _res.data.data;
        }
        else {
            $scope.providers = [];
        }
    });

    $scope.setProgressData = function (form, _activePlan) {
        var newProgressText = $scope.activePlan.Progress.Text;
        var newProgressDate = new Date();
        var newProgressProvider = $rootScope.currentProviderName;
        var newObj = { Text: newProgressText, Date: newProgressDate, Provider: newProgressProvider };
        console.log(newObj);
        for (i = 0; i < $scope.plans.length; i++) {
            if ($scope.plans[i] === _activePlan) {
                console.log($scope.plans[i]);
                $scope.plans[i].Progress.push(newObj);
                console.log($scope.plans[i]);
                return;
            }
        }
        $scope.activePlan.Progress.Text = "";
        $scope.frmProgress.$setPristine();
    }


    $scope.newPlan = {
        Status: '', Provider: '10', Reason: '',
        OtherConsideration: '', OtherPlan: '', PatientAgree: false,
        PlanName: '', ToImprove: '', Progress: [],
        ToAchieve1: '', AgreedActions1: '', ByWho1: { Name: 'Name', Email: 'example@mail.com' }, ByWhen1: new moment(),
        ToAchieve2: '', AgreedActions2: '', ByWho2: { Name: 'Name', Email: 'example@mail.com' }, ByWhen2: new moment()
    };

    $scope.createPlan = function (form) {
        angular.forEach($scope.frmNewPlan.$error.required, function (field) {
            field.$setDirty();
        });
        //console.log($scope.cmbProvider);
        if ($scope.newPlan.Provider == '10') {
            angular.element(document.getElementById('cmbProvider')).addClass('errorBorder');
            angular.element(document.getElementById('lblProvider')).addClass('errorFont');
        }
        //$scope.newPlan.Provider = $scope.cmbProvider;
        if (form.$valid) {
            console.log('add');
            ////loader
            $rootScope.loading = true;
            $scope.newPlan.IsNew = true;
            console.log($scope.newPlan);

            $scope.plans.push($scope.newPlan);
            if ($scope.activePlan) {
                var req = {
                    method: 'put',
                    url: '/CarePlans',
                    data: {
                        _id: $scope.currentClientInfo._id,
                        CarePlans: $scope.plans,
                        emailTo: [$scope.activePlan.ByWho1.Email, $scope.activePlan.ByWho2.Email]
                    }
                }
            }
            else { // this is the first plan
                var req = {
                    method: 'put',
                    url: '/CarePlans',
                    data: {
                        _id: $scope.currentClientInfo._id,
                        CarePlans: $scope.plans,
                        emailTo: []
                    }
                }
            }

            console.log(req.data);
            //// save now to db
            API.execute(req).then(function (_res) {
                console.log(_res.data);
                if (_res.data.code == 100) {
                    $scope.frmNewPlan.$setPristine();
                    $scope.dismiss();
                    $scope.newPlan = {
                        Status: '', Provider: '10', Reason: '',
                        OtherConsideration: '', OtherPlan: '', PatientAgree: false,
                        PlanName: '', ToImprove: '', Progress: [],
                        ToAchieve1: '', AgreedActions1: '', ByWho1: { Name: 'Name', Email: 'example@mail.com' }, ByWhen1: new moment(),
                        ToAchieve2: '', AgreedActions2: '', ByWho2: { Name: 'Name', Email: 'example@mail.com' }, ByWhen2: new moment()
                    };

                    // get client data 
                    var req = {
                        method: 'get',
                        url: '/Client/' + $scope.currentClientInfo._id,
                        data: {}
                    }

                    API.execute(req).then(function (_res) {
                        console.log(_res.data);
                        if (_res.data.code == 100) {
                            $scope.plans = _res.data.data[0].CarePlans;
                            console.log($scope.plans);
                            $rootScope.loading = false;
                            // if this is first plan
                            if ($stateParams.planid == "" || $stateParams.planid == 'undefined') {
                                console.log('iffff');
                                $scope.activePlanTab = $scope.plans[0]._id;
                                $scope.activePlan = $scope.plans[0];
                                $location.path('/healthrecord/careplans/' + $scope.plans[0]._id);
                                $state.reload();
                            }
                        }
                    })
                }
                else {
                    console.log('error');
                }
            }, function (error) { // another error may be connection error

            }).finally(function () {
                //$('#innerTabs').scrollTop(document.body.scrollHeight);
            });
        }

    }

    $scope.ConfirmCreateModal = function () {
        // if not first plan
        if ($scope.currentClientInfo.CarePlans.length != 0) {
            console.log('if1');
            for (var i = 0; i < $scope.currentClientInfo.CarePlans.length; i++) {
                if ($scope.currentClientInfo.CarePlans[i].ToImprove == "" || $scope.currentClientInfo.CarePlans[i].ToAchieve1 == "" || $scope.currentClientInfo.CarePlans[i].ToAchieve2 == "" || $scope.currentClientInfo.CarePlans[i].AgreedActions1 == "" || $scope.currentClientInfo.CarePlans[i].AgreedActions2 == "") {
                    $scope.test = 'tt';
                    $scope.unFinishedplanName = $scope.currentClientInfo.CarePlans[i].PlanName;
                }
            }
            if ($scope.test == 'tt') {
                // show finish plan first modal
                console.log('if2');
                $scope.openFinishModal();
                $scope.test = '';

            } else {
                console.log('else2');
                $scope.openConfirmCreateModal();
                $scope.test = '';
            }
        }

        else //if first plan
        {
            console.log('else1');
            $scope.openConfirmCreateModal();
        }
    }

    $scope.deletePlan = function () {
        $rootScope.loading = true;
        console.log('delete');
        var index = $scope.plans.indexOf($scope.activePlan);
        $scope.plans.splice(index, 1);
        console.log($scope.plans);
        var req = {
            method: 'put',
            url: '/CarePlans',
            data: {
                _id: $scope.currentClientInfo._id,
                CarePlans: $scope.plans,
                emailTo: [$scope.activePlan.ByWho1.Email, $scope.activePlan.ByWho2.Email]
            }
        }
        console.log(req.data);
        //// save now to db
        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                // get client data 
                var req = {
                    method: 'get',
                    url: '/Client/' + $scope.currentClientInfo._id,
                    data: {}
                }

                API.execute(req).then(function (_res) {
                    console.log(_res.data);
                    if (_res.data.code == 100) {
                        $scope.plans = _res.data.data[0].CarePlans;
                        console.log($scope.plans);
                        $rootScope.loading = false;
                    }
                })
            }
            else {
                console.log('error');
            }
        }, function (error) {

        }).finally(function () {
            //$('#innerTabs').scrollTop(document.body.scrollHeight);
        });

    }

    $scope.editPlan = function (form) {
        $rootScope.loading = true;
        console.log($scope.plans);
        if (form.$valid) {
            $rootScope.loading = true;
            var req = {
                method: 'put',
                url: '/CarePlans',
                data: {
                    _id: $scope.currentClientInfo._id,
                    CarePlans: $scope.plans,
                    emailTo: [$scope.activePlan.ByWho1.Email, $scope.activePlan.ByWho2.Email]
                }
            }
            console.log(req.data);
            API.execute(req).then(function (_res) {
                console.log(_res.data);
                if (_res.data.code == 100) {
                    $scope.frmEditPlan.$setPristine();
                    $rootScope.loading = false;
                }
                else {
                    console.log('error');
                }
            }, function (error) {
            }).finally(function () {
                //$('#innerTabs').scrollTop(document.body.scrollHeight);
            });
        }
    }

    $scope.setActivePlan = function (_plan) {
//$location.path('/healthrecord/careplans/' + _plan._id);
        //$scope.activePlanTab = _plan._id;
        //$scope.activePlan = _plan;
        $scope.currentClientInfo.CarePlans = $scope.plans;
        
        //$state.reload();
    }

    //$scope.setBywho1Data = function (form) {
    //    angular.element(document.getElementsByClassName('txtByWho')).removeClass('errorBorder');
    //    angular.element(document.getElementsByClassName('lblByWho')).removeClass('errorFont');
    //    form.$valid = true;
    //}
    //$scope.setBywho2Data = function (form) {
    //    angular.element(document.getElementsByClassName('txtByWho2')).removeClass('errorBorder');
    //    angular.element(document.getElementsByClassName('lblByWho2')).removeClass('errorFont');
    //    form.$valid = true;
    //}

    $scope.submit = function (form) {
        angular.forEach($scope.frmPlan.$error.required, function (field) {
            field.$setDirty();
        });

        //if ($scope.activePlan.ByWho1.Email == 'example@mail.com') {
        //    console.log('here');
        //    angular.element(document.getElementsByClassName('txtByWho')).addClass('errorBorder');
        //    angular.element(document.getElementsByClassName('lblByWho')).addClass('errorFont');
        //    form.$valid = false;
        //}
        //if ($scope.activePlan.ByWho2.Email == 'example@mail.com') {
        //    console.log('here2');
        //    angular.element(document.getElementsByClassName('txtByWho2')).addClass('errorBorder');
        //    angular.element(document.getElementsByClassName('lblByWho2')).addClass('errorFont');
        //    form.$valid = false;
        //}
        if (form.$valid) {
            $rootScope.loading = true;
            var req = {
                method: 'put',
                url: '/CarePlans',
                data: {
                    _id: $scope.currentClientInfo._id,
                    CarePlans: $scope.plans,
                    emailTo: [$scope.activePlan.ByWho1.Email, $scope.activePlan.ByWho2.Email]
                }
            }
            console.log(req.data);
            API.execute(req).then(function (_res) {
                console.log(_res.data);
                if (_res.data.code == 100) {
                    $scope.frmPlan.$setPristine();
                    $rootScope.loading = false;
                }
                else {
                    console.log('error');
                }
            }, function (error) {
            }).finally(function () {
                //$('#innerTabs').scrollTop(document.body.scrollHeight);
            });
        }
    }

    $scope.exportPDF = function () {
        console.log('export PDF goes here');
        //// export PDF here for $scope.activePlan OR $scope.plans
        //html2canvas(document.getElementById('innerTabs'), {
        //    onrendered: function (canvas) {
        //        var data = canvas.toDataURL();
        //        var docDefinition = {
        //            content: [{
        //                image: data,
        //                width: 500,
        //            }]
        //        };
        //        pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
        //    }
        //});
    }

    $scope.reassign = function () {
        console.log($scope.activePlan.Provider);
        console.log($rootScope.currentProviderId);
        $scope.activePlan.Provider = $rootScope.currentProviderId;  // add current provider: $rootScope.currentProviderId;
        console.log($scope.activePlan);
        console.log($scope.plans);

        $rootScope.loading = true;
        var req = {
            method: 'put',
            url: '/CarePlans',
            data: {
                _id: $scope.currentClientInfo._id,
                CarePlans: $scope.plans,
                emailTo: [$rootScope.currentProviderEmail]
            }
        }
        console.log(req.data);
        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                console.log('done');
            }
            else {
                console.log('error');
            }
        }, function (error) {
        }).finally(function () {
            $rootScope.loading = false;
        });
    }

    //$scope.activePlan.Provider
    $scope.$watch('activePlan.Provider', function () {
        for (var i = 0; i < $scope.providers.length; i++) {
            if ($scope.providers[i]._id == $scope.activePlan.Provider) {
                $scope.provideName = $scope.providers[i].Name;
            }
        }

    });

    $scope.datepickerconfigurations1 = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdownByWhen1'
    };

    $scope.datepickerconfigurations2 = {
        startView: 'year',
        minView: 'day',
        dropdownSelector: '#dropdownByWhen2'
    };

    $scope.onTimeSetPlan = function (_newDate, _oldDate, _id) {
        $timeout(function () {
            angular.element(document.getElementById('txtByWhen' + _id)).addClass('used');
        });
    }

    $scope.setDateToTodayUI1 = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtByWhen1')).addClass('used');
        });
    }

    $scope.setDateToTodayUI2 = function () {
        $timeout(function () {
            angular.element(document.getElementById('txtByWhen2')).addClass('used');
        });
    }

    $scope.openModalByWho = function (_provider) {
        $('#byWhoModal').modal('show');
        $timeout(function () {
            angular.element(document.getElementById('byWhoModal')).addClass('showMe');
        }, 1000);
    }

    $('#prgrsModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
        $('#innerTabs').scrollTop(document.body.scrollHeight);
        $('.dvProgressContainer').scrollTop(document.body.scrollHeight);
    })

});