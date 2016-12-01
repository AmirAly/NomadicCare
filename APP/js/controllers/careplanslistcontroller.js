ehs.controller("CareplanslistController", function ($scope, $state,$timeout, $rootScope, $stateParams, API) {
    $rootScope.pageHeader = 'Plans List';

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
                console.log($scope.careplans);

            });
        }
        else {
            $scope.careplans = [];
        }
        //$scope.loading = false;
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    }).finally(function () {
        $rootScope.loading = false;
    });


    $scope.viewClient = function (_clientid) {
        $state.go('client', { clientid: _clientid });
    }

    $scope.viewProvider = function (_providerId) {
        $state.go('provider', { providerid: _providerId });
    }

    $scope.viewPlan = function (_clientid, _planId) {
        $state.go('healthrecord.careplans', { planid: _planId });
        $rootScope.PlanId = _planId;
        $rootScope.ClientId = _clientid;
    }

});