ehs.controller("ClientsController", function ($scope, $state, $rootScope,$timeout, API) {
    $rootScope.pageHeader = 'Clients';

    var req = {
        method: 'get',
        url: '/Client/List/' + $rootScope.currentProviderId,
        data: {}
    }
    ////loader
    $rootScope.loading = true;

    API.execute(req).then(function (_res) {
        console.log(_res.data);
        if (_res.data.code == 100) {
            $scope.clients = _res.data.data;
            // add fullName to clients (that contain first name, last name) to use it in filteration
            angular.forEach($scope.clients, function (value, key) {
                    var fullName = value.FirstName + ' ' + value.LastName;
                    $scope.clients[key].fullName = fullName;
            });
        }
        else {
            $scope.clients = [];
        }
        console.log($scope.clients);
        //$scope.loading = false;
    }, function (error) {
        $scope.showMessage = true;
        $scope.messageTxt = 'Connection Error , It Seems There Is A Problem With Your Connection ...';
        $scope.messageStatus = 'warning';
    })
    .finally(function () {
        $rootScope.loading = false;
    });


    $scope.showClientDetails = function (_clientId) {
        $state.go('client', { clientid: _clientId });
    }
});


