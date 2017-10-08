(function () {
    var app = angular.module('customerPortal', ['ngRoute', 'mcwebb.twilio', 'ngNotify'])

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "pages/login.html"
            })
            .when("/myvotes", {
                templateUrl: "pages/myvotes.html"
            })
            .when("/verification", {
                templateUrl: "pages/verification.html"
            })
    });

    app.config(function (TwilioProvider) {
        TwilioProvider.setCredentials({
            accountSid: 'ACfcc6c7984be14c54414ae757245fe958',
            authToken: '52652fda5d5b996ccbed5f4e2534d588'
        })
    });
})();