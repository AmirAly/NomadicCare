//directive with function to close the modal
carerportal.directive('myModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss = function () {
                console.log('here');
                element.modal('hide');
            };
        }
    }
});
