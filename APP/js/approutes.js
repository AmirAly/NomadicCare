ehs.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        cache: false,
        url: '/login',
        views: {
            '': { templateUrl: 'views/login.html', controller: 'LoginController' },
            'footerView@login': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })

/*System routes*/
    .state('listorganizations', {
        cache: false,
        url: '/listorganizations',
        views: {
            '': { templateUrl: 'views/listorganizations.html', controller: 'ListorganizationsController' },
            'headerView@listorganizations': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('organization', {
        cache: false,
        url: '/organization/:orgid?',
        views: {
            '': { templateUrl: 'views/organization.html', controller: 'OrganizationController' },
            'headerView@organization': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('listproviderssystem', {
        cache: false,
        url: '/listproviderssystem/:orgid?',
        views: {
            '': { templateUrl: 'views/listproviderssystem.html', controller: 'ListproviderssystemController' },
            'headerView@listproviderssystem': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('providerssystem', {
        cache: false,
        url: '/providerssystem/:orgid/:providerid?',
        views: {
            '': { templateUrl: 'views/providerssystem.html', controller: 'providerssystemController' },
            'headerView@providerssystem': { templateUrl: 'views/templates/header.temp.html' },
        }
    })

        /*Admin routes*/
    .state('clients', {
        cache: false,
        url: '/clients',
        views: {
            '': { templateUrl: 'views/clients.html', controller: 'ClientsController' },
            'headerView@clients': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('client', {
        cache: false,
        url: '/client/:clientid?',//index.html#/client/10
        views: {
            '': { templateUrl: 'views/client.html', controller: 'ClientController' },
            'headerView@client': { templateUrl: 'views/templates/header.temp.html' }
        }
    })
    .state('listproviders', {
        cache: false,
        url: '/listproviders/:orgid?',
        views: {
            '': { templateUrl: 'views/listproviders.html', controller: 'ListprovidersController' },
            'headerView@listproviders': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('provider', {
        cache: false,
        url: '/provider/:orgid/:providerid?',
        //url: '/provider/:providerid?',
        views: {
            '': { templateUrl: 'views/provider.html', controller: 'ProviderController' },
            'headerView@provider': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('careplanslist', {
        cache: false,
        url: '/careplanslist/:orgid?',
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
        cache: false,
        url: '/healthrecord',
        views: {
            '': { templateUrl: 'views/healthrecord.html', controller: 'HealthrecordController' },
            'headerView@healthrecord': { templateUrl: 'views/templates/header2.temp.html' },
            'footerView@healthrecord': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })


    // nested list with custom controller
    .state('healthrecord.healthmeasurment', {
        cache: false,
        url: '/healthmeasurment',
        // inner tabs headers (add template here)
        templateUrl: 'views/templates/healthmeasurment.innertabs.temp.html',
        controller: function ($scope) {
            //$scope.activetab = 'weight';

        }
    })
        // inner tabs for healthmeasurment
        .state('healthrecord.healthmeasurment.weight', {
            cache: false,
            url: '/weight',
            templateUrl: 'views/templates/weight.temp.html',
            controller: 'WeightController'
        })
        .state('healthrecord.healthmeasurment.activity', {
            cache: false,
            url: '/activity',
            templateUrl: 'views/templates/activity.temp.html',
            controller: 'ActivityController'
        })
        .state('healthrecord.healthmeasurment.bloodpressure', {
            cache: false,
            url: '/bloodpressure',
            templateUrl: 'views/templates/bloodpressure.temp.html',
            controller: 'BloodpressureController'
        })
        .state('healthrecord.healthmeasurment.cholesterol', {
            cache: false,
            url: '/cholesterol',
            templateUrl: 'views/templates/cholesterol.temp.html',
            controller: 'CholesterolController'
        })
        .state('healthrecord.healthmeasurment.hba1c', {
            cache: false,
            url: '/hba1c',
            templateUrl: 'views/templates/hba1c.temp.html',
            controller: 'Hba1cController'
        })
        .state('healthrecord.healthmeasurment.bloodglucose', {
            cache: false,
            url: '/bloodglucose',
            templateUrl: 'views/templates/bloodglucose.temp.html',
            controller: 'BloodglucoseController'
        })




     .state('healthrecord.healthnotes', {
         cache: false,
         url: '/healthnotes',
         // inner tabs headers (add template here)
         templateUrl: 'views/templates/healthnotes.innertabs.temp.html',
         controller: function ($scope) {
             //$scope.activetab = 'medications';
         }
     })

        // inner tabs for healthnotes
    .state('healthrecord.healthnotes.medications', {
        cache: false,
        url: '/medications',
        templateUrl: 'views/templates/medications.temp.html',
        controller: 'MedicationsController'
    })

        .state('healthrecord.healthnotes.allergies', {
            cache: false,
            url: '/allergies',
            templateUrl: 'views/templates/allergies.temp.html',
            controller: 'AllergiesController'
        })
        .state('healthrecord.healthnotes.vaccinations', {
            cache: false,
            url: '/vaccinations',
            templateUrl: 'views/templates/vaccinations.temp.html',
            controller: 'VaccinationsController'
        })
        .state('healthrecord.healthnotes.diagnosis', {
            cache: false,
            url: '/diagnosis',
            templateUrl: 'views/templates/diagnosis.temp.html',
            controller: 'DiagnosisController'
        })
        .state('healthrecord.healthnotes.laboratory', {
            cache: false,
            url: '/laboratory',
            templateUrl: 'views/templates/laboratory.temp.html',
            controller: 'LaboratoryController'
        })
        .state('healthrecord.healthnotes.followup', {
            cache: false,
            url: '/followup',
            templateUrl: 'views/templates/followup.temp.html',
            controller: 'FollowupController'
        })
        .state('healthrecord.healthnotes.documents', {
            cache: false,
            url: '/documents',
            templateUrl: 'views/templates/documents.temp.html',
            controller: 'DocumentsController'
        })


    .state('healthrecord.consultationnotes', {
        cache: false,
        url: '/consultationnotes',
        // inner tabs headers (add template here)
        templateUrl: 'views/templates/consultationnotes.temp.html',
        controller: 'ConsultationnotesController'
    })

    .state('healthrecord.analytics', {
        cache: false,
        url: '/analytics',
        // inner tabs headers (add template here)
        templateUrl: 'views/templates/analytics.temp.html',
        controller: 'AnalyticsController'
    })

     .state('healthrecord.careplans', {
         cache: false,
         url: '/careplans/:planid?',
         // inner tabs headers (add template here)
         templateUrl: 'views/templates/careplans.temp.html',
         controller: 'CareplansController'
     })
    ;
    $urlRouterProvider.otherwise('/login');
});