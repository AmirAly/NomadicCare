var ehs = angular.module("ehs", ['ui.router', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'ui.dateTimeInput', 'uiSwitch']);

ehs.run(function ($rootScope, $state) {
    $rootScope.logout = function () {
        $state.go('login');
    };
    $rootScope.DeleteConfirmed = false;
    $rootScope.DeleteConfirmed2 = false;

});

ehs.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        views: {
            '': { templateUrl: 'views/login.html', controller: 'LoginController' },
            'footerView@login': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })

/*System routes*/
    .state('listorganizations', {
        url: '/listorganizations',
        views: {
            '': { templateUrl: 'views/listorganizations.html', controller: 'ListorganizationsController' },
            'headerView@listorganizations': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('organization', {
        url: '/organization/:orgid?',
        views: {
            '': { templateUrl: 'views/organization.html', controller: 'OrganizationController' },
            'headerView@organization': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('listproviderssystem', {
        url: '/listproviderssystem',
        views: {
            '': { templateUrl: 'views/listproviderssystem.html', controller: 'ListproviderssystemController' },
            'headerView@listproviderssystem': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('providerssystem', {
        url: '/providerssystem/:providerid?',
        views: {
            '': { templateUrl: 'views/providerssystem.html', controller: 'providerssystemController' },
            'headerView@providerssystem': { templateUrl: 'views/templates/header.temp.html' },
        }
    })

        /*Admin routes*/
    .state('clients', {
        url: '/clients',
        views: {
            '': { templateUrl: 'views/clients.html', controller: 'ClientsController' },
            'headerView@clients': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('client', {
        url: '/client/:clientid?',//index.html#/client/10
        views: {
            '': { templateUrl: 'views/client.html', controller: 'ClientController' },
            'headerView@client': { templateUrl: 'views/templates/header.temp.html' }
        }
    })
    .state('listproviders', {
        url: '/listproviders',
        views: {
            '': { templateUrl: 'views/listproviders.html', controller: 'ListprovidersController' },
            'headerView@listproviders': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('provider', {
        url: '/provider/:providerid?',
        views: {
            '': { templateUrl: 'views/provider.html', controller: 'ProviderController' },
            'headerView@provider': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('careplanslist', {
        url: '/careplanslist',
        views: {
            '': { templateUrl: 'views/careplanslist.html', controller: 'CareplanslistController' },
            'headerView@careplanslist': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    //// second state for same page
    //.state('healthrecord', {
    //    url: '/healthrecord/:clientid/:planid?',
    //    views: {
    //        '': { templateUrl: 'views/healthrecord.html', controller: 'HealthrecordController' },
    //        'headerView@healthrecord': { templateUrl: 'views/templates/header2.temp.html' },
    //        'footerView@healthrecord': { templateUrl: 'views/templates/footer.temp.html' }
    //    }
    //})

///////////////////////// TABS /////////////////////////

    .state('healthrecord', {
        url: '/healthrecord',
        views: {
            '': { templateUrl: 'views/healthrecord.html', controller: 'HealthrecordController' },
            'headerView@healthrecord': { templateUrl: 'views/templates/header2.temp.html' },
            'footerView@healthrecord': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })


    // nested list with custom controller
    .state('healthrecord.healthmeasurment', {
        url: '/healthmeasurment',
        // inner tabs headers (add template here)
        templateUrl: 'views/templates/healthmeasurment.innertabs.temp.html',
        controller: function ($scope) {
            $scope.activetab = 'weight';

        }
    })
        // inner tabs for healthmeasurment
        .state('healthrecord.healthmeasurment.weight', {
            url: '/weight',
            templateUrl: 'views/templates/weight.temp.html',
            controller: 'WeightController'
        })
        .state('healthrecord.healthmeasurment.activity', {
            url: '/activity',
            templateUrl: 'views/templates/activity.temp.html',
            controller: 'ActivityController'
        })
        .state('healthrecord.healthmeasurment.bloodpressure', {
            url: '/bloodpressure',
            templateUrl: 'views/templates/bloodpressure.temp.html',
            controller: 'BloodpressureController'
        })
        .state('healthrecord.healthmeasurment.cholesterol', {
            url: '/cholesterol',
            templateUrl: 'views/templates/cholesterol.temp.html',
            controller: 'CholesterolController'
        })
        .state('healthrecord.healthmeasurment.hba1c', {
            url: '/hba1c',
            templateUrl: 'views/templates/hba1c.temp.html',
            controller: 'Hba1cController'
        })
        .state('healthrecord.healthmeasurment.bloodglucose', {
            url: '/bloodglucose',
            templateUrl: 'views/templates/bloodglucose.temp.html',
            controller: 'BloodglucoseController'
        })




     .state('healthrecord.healthnotes', {
         url: '/healthnotes',
         // inner tabs headers (add template here)
         templateUrl: 'views/templates/healthnotes.innertabs.temp.html',
         controller: function ($scope) {
             $scope.activetab = 'medications';
         }
     })

        // inner tabs for healthnotes
    .state('healthrecord.healthnotes.medications', {
        url: '/medications',
        templateUrl: 'views/templates/medications.temp.html',
        controller: 'MedicationsController'
    })

        .state('healthrecord.healthnotes.allergies', {
            url: '/allergies',
            templateUrl: 'views/templates/allergies.temp.html',
            controller: 'AllergiesController'
        })
        .state('healthrecord.healthnotes.vaccinations', {
            url: '/vaccinations',
            templateUrl: 'views/templates/vaccinations.temp.html',
            controller: 'VaccinationsController'
        })
        .state('healthrecord.healthnotes.diagnosis', {
            url: '/diagnosis',
            templateUrl: 'views/templates/diagnosis.temp.html',
            controller: 'DiagnosisController'
        })
        .state('healthrecord.healthnotes.laboratory', {
            url: '/laboratory',
            templateUrl: 'views/templates/laboratory.temp.html',
            controller: 'LaboratoryController'
        })
        .state('healthrecord.healthnotes.followup', {
            url: '/followup',
            templateUrl: 'views/templates/followup.temp.html',
            controller: 'FollowupController'
        })
        .state('healthrecord.healthnotes.documents', {
            url: '/documents',
            templateUrl: 'views/templates/documents.temp.html',
            controller: 'DocumentsController'
        })


    .state('healthrecord.consultationnotes', {
        url: '/consultationnotes',
        // inner tabs headers (add template here)
        templateUrl: 'views/templates/consultationnotes.temp.html',
        controller: 'ConsultationnotesController'
    })

    .state('healthrecord.analytics', {
        url: '/analytics',
        // inner tabs headers (add template here)
        templateUrl: 'views/templates/analytics.temp.html',
        controller: 'AnalyticsController'
    })

     .state('healthrecord.careplans', {
         url: '/careplans/:planid?',
         // inner tabs headers (add template here)
         templateUrl: 'views/templates/careplans.temp.html',
         controller: 'CareplansController'
     })
    ;
    $urlRouterProvider.otherwise('/login');
});
