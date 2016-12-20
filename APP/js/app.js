var ehs = angular.module("ehs", ['ui.router', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'ui.dateTimeInput', 'uiSwitch']);

ehs.run(function ($rootScope, $state, slidePush, $location, $timeout) {

    window.confirm = function (message, callback, caption) {
        caption = caption || 'Confirmation'

        $(document.createElement('div')).attr({
            title: caption,
            'class': 'dialog'
        }).html(message).dialog({
            position: ['center', 200],
            dialogClass: 'fixed',
            buttons: {
                "Cancel": function () {
                    $(this).dialog('close');
                    return false;
                },
                "OK": function () {
                    $(this).dialog('close');
                    callback();
                    return true;
                }
            },
            close: function () {
                $(this).remove();
            },
            draggable: false,
            modal: true,
            resizable: false,
            width: 'auto'
        });
    };

    window.alert = function (message) {
        $(document.createElement('div')).attr({
            'class': 'dialog'
        }).html(message).dialog({
            position: ['center', 200],
            title:'Message',
            buttons: {
                'OK':function(){
                    $(this).dialog('close');
                }
            },
            draggable: false,
            modal: true,
            resizable: false,
            width: 'auto'
        });
    };

    $rootScope.logout = function () {
        confirm('Are you sure you want to logout ?', function () {
            // if menu opened , close it first before  logout
            slidePush.pushForceClose(angular.element(document.querySelector('#menu')), angular.element(document.querySelector('#menuIcon')));
            $rootScope.currentProviderId = "";
            $rootScope.currentProviderName = "";
            $rootScope.userType = '';
            $state.go('login');
        });

    };

    // set default values
    $rootScope.DeleteConfirmed = false;
    $rootScope.DeleteConfirmed2 = false;
    $rootScope.OrganizationId = 0;
    $rootScope.DateIsToday = new Date();
    $rootScope.secondArrayName = "";

    // when userType is undefined ,redirect to login 
    $rootScope.$watch('$root.userType', function () {
        $timeout(function () {
            if (typeof $rootScope.userType === 'undefined') {
                $location.path("/login/");
            }
        }, 1500);

    });

    $rootScope.generatePassword = function () {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };

    $rootScope.generateRandomName = function () {
        var length = 12,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

});