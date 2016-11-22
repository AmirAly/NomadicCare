// Vallidation & Input Effect Direrctives
ehs.directive('ngInputEffectClass', function ($timeout) {
    return ({
        restrict: 'A',
        link: function (scope, element, attr) {
            //console.log('load');
            $timeout(function () {
                if (element.val()) {
                    element.addClass('used');
                }
                else {
                    element.removeClass('used');
                }
            }, 100);
            element.on('blur', function () {
                if (element.val()) {
                    element.addClass('used');
                }
                else {
                    $(this).removeClass('used');
                }
            });
        }
    });
});

ehs.directive('ngSelectEffectClass', function () {
    return ({
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('change', function () {
                if (element.val() != '0') {
                    element.addClass('used');
                }
                else {
                    $(this).removeClass('used');
                }
            });
        }
    });
});

ehs.directive('isRequired', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

ehs.directive('isRequiredSelect', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            //function myValidation(value) {
            //    if (value != '0') {
            //        mCtrl.$setValidity('charE', true);
            //    } else {
            //        mCtrl.$setValidity('charE', false);
            //    }
            //    return value;
            //}
            //mCtrl.$parsers.push(myValidation);
        }
    };
});

ehs.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value, 10);
            });
        }
    };
});

ehs.directive('confirmOnExit', function () {
    return {
        link: function ($scope, elem, attrs) {
            console.log(elem[0].name);
            var formName = elem[0].name;
            window.onbeforeunload = function () {
                console.log('onbeforeunload');
                if ($scope[formName].$dirty) {
                    return "Do you want to leave the page without saving changes?";
                }
            }
            $scope.$on('$stateChangeStart', function (event, next, current) {
                console.log('stateChangeStart');
                if ($scope[formName].$dirty) {
                    if (!confirm("Do you want to leave the page without saving changes?")) {
                        event.preventDefault();
                    }
                }
            });
        }
    };
});

ehs.directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val != null ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val != null ? '' + val : null;
            });
        }
    };
});

//directive with function to close the modal
ehs.directive('myModal', function () {
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

ehs.filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined) return text.replace(/\n/g, '<br />');
    };
});

ehs.filter('unbreakFilter', function () {
    return function (text) {
        if (text !== undefined) return text.replace('<br />',/\n/g);
    };
});