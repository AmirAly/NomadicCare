ehs.controller("CareplanslistController", function ($scope, $state, $rootScope) {
    $rootScope.pageHeader = 'Plans List';

    $scope.careplans = [
        {
            client: { id: 1, name: 'Ahmed Ali', img: 'images/user0.jpg' },
            provider: { id: 1, name: 'Amir Ali', img: 'images/user8.jpg' },
            planId:1, planName: 'Weight Loss', planStatus: 'Active', lastUpdated: '12/3/2016'
        },
        {
            client: { id: 2, name: 'Hany Ali', img: 'images/user1.jpg' },
            provider: { id: 1, name: 'Amir Ali', img: 'images/user8.jpg' },
            planId: 2, planName: 'Weight Loss', planStatus: 'Active', lastUpdated: '12/3/2016'
        },
        {
            client: { id: 3, name: 'Mohamed Alaa', img: 'images/user2.jpg' },
            provider: { id: 1, name: 'Amir Ali', img: 'images/user8.jpg' },
            planId: 3, planName: 'Weight Loss', planStatus: 'Active', lastUpdated: '12/3/2016'
        },
        {
            client: { id: 4, name: 'Tareq Mahdy', img: 'images/user3.jpg' },
            provider: { id: 1, name: 'Amir Ali', img: 'images/user8.jpg' },
            planId: 4, planName: 'Weight Loss', planStatus: 'Active', lastUpdated: '12/3/2016'
        },
    ];

    $scope.viewClient = function (_clientid) {
        $state.go('client', { clientid: _clientid });
    }

    $scope.viewProvider = function (_providerId) {
        $state.go('provider', { providerid: _providerId });
    }

    $scope.viewPlan = function (_clientid, _planId) {
        $state.go('healthrecord.careplans', { planid: 1 });
        $rootScope.PlanId = _planId;
        $rootScope.ClientId = _clientid;
    }

});