ehs.controller("ClientsController", function ($scope, $state, $rootScope) {
    $rootScope.pageHeader = '';

    $scope.clients = [{id:1, name: 'Ahmed Ali', img: 'images/user0.jpg' },
    { id: 2, name: 'Hany Ali', img: 'images/user1.jpg' },
    { id: 3, name: 'Mohamed Alaa', img: 'images/user2.jpg' },
    { id: 4, name: 'Tareq Mahdy', img: 'images/user3.jpg' },
    { id: 5, name: 'Maged Mosa', img: 'images/user4.jpg' },
    { id: 6, name: 'Saad Gad', img: 'images/user5.jpg' },
    { id: 7, name: 'Kamel Zahran', img: 'images/user6.jpg' }];

    $scope.showClientDetails = function (_clientId) {
        $state.go('client', { clientid: _clientId });
    }
});


