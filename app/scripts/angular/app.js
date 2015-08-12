// Fix for undefined console in IE
if (typeof console === "undefined") {
    this.console = {log: function() {}};
}

angular.module("ac2rc", [ 
    "ui.router",
    "ngMap",
    "ngTouch",
    "ng.shims.placeholder"
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, baseUrl) {
    $urlRouterProvider.otherwise("");
    

    $stateProvider
        .state('intro', {
            url: '',
            views: {
                'intro' : {
                    controller: 'introCtrl'
                },
                'nav' : {
                    controller: 'navCtrl'
                },
                
                'benefits' : {
                    templateUrl:  baseUrl + '/views/benefits.html',
                    controller: 'benefitsCtrl'
                },
                'success' : {
                    templateUrl:  baseUrl + '/views/success.html',
                    controller: 'successCtrl'
                },
                'locations' : {
                    templateUrl:  baseUrl + '/views/locations.html',
                    controller: 'locationsCtrl'
                },
                'step-guide' : {
                    templateUrl:  baseUrl + '/views/step-guide.html',
                    controller: 'stepGuideCtrl'
                }
            }

        })
        .state('intro.intro', {
            url: '/intro'
        })
        .state('intro.benefits', {
            url: '/benefits'
        })
        .state('intro.success', {
            url: '/success'
        })
        .state('intro.locations', {
            url: '/locations'
        })
        .state('intro.stepGuide', {
            url: '/stepGuide'
        });
       

    $locationProvider.html5Mode(false).hashPrefix("");
});