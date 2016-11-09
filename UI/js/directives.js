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