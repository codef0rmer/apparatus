'use strict';

var FiltersModule = angular.module('App.filters', []);

var App = angular.module('apparatusApp', ['firebase', 'timer', 'ngCookies', 'App.filters']);

App.constant('CONFIG', CONFIG);

App.config(function($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/', {
      templateUrl: 'views/registration.html',
      controller: 'RegistrationCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        validate: function($q, $location) {
          var validateAccess = $q.defer();

          if (CONFIG.demo) {
            $location.path('/main');
          }

          validateAccess.resolve();
          return validateAccess.promise;
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});

App.run(function($rootScope, $timeout, $cookies, $location, Auth) {
  $rootScope.$on('auth:logout', function(event, args) {
    $timeout(function() {
      delete $cookies.user;
      $location.path('/');
    });
  });

  $rootScope.$on('$routeChangeStart', function(scope, next, current) {
    Auth.init();
    $rootScope.cookies = $cookies;
  });

  $rootScope.logout = function() {
    Auth.sally.logout();
  };
});