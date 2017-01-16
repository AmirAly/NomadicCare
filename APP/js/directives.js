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

ehs.directive('confirmOnExit', function ($state) {
    return {
        link: function ($scope, elem, attrs, ctrl) {
            window.onbeforeunload = function () {
                if ($scope[attrs["name"]].$dirty) {
                    return "Your edits will be lost Unless you save changes first.";
                }
            }
            $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                console.log(toState);
                console.log(toParams);
                console.log(fromState);
                console.log(fromParams);
                console.log(attrs["name"]);
                if ($scope[attrs["name"]].$dirty) {
                    event.preventDefault();
                    confirm("Your edits will be lost Unless you save changes first.", function () {
                        $scope[attrs["name"]].$setPristine();
                        event.defaultPrevented = false;
                        event.allowDefault = true;
                        if (attrs["name"] == 'frmPlan' && toState == 'healthrecord.careplans') {
                            $state.go(toState.name, toParams);
                        }
                        else {
                            $state.go(toState.name, toParams);
                        }
                    });
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

// show create confirmation modal
ehs.directive('confirmCreateModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.openConfirmCreateModal = function () {
                console.log('here');
                element.modal('show');
            };
        }
    }
});

// show create confirmation modal
ehs.directive('confirmFinishModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.openFinishModal = function () {
                console.log('here');
                element.modal('show');
            };
        }
    }
});

// compare password validation
ehs.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});

ehs.directive('fallbacksrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", 'images/down.png');
                angular.element(this).attr("style", 'background-color:#fff;border-radius: 50%;');
            });
        }
    }
    return fallbackSrc;
});



// show /hide Password modal
//ehs.directive('passwordModal', function () {
//    return {
//        restrict: 'A',
//        link: function (scope, element, attr) {
//            scope.openPasswordModal = function () {
//                console.log('show');
//                element.modal('show');
//            };
//            scope.hidePasswordModal = function () {
//                console.log('hide');
//                element.modal('hide');
//            };
//        }
//    }
//});