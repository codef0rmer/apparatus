'use strict';

App.controller('RegistrationCtrl', function($scope, $timeout, $cookies, $location, Auth, CONFIG) {
  $scope.CONFIG = CONFIG;

  $scope.$on('auth:login', function(event, args) {
    $timeout(function() {
      $scope.error_code = '';
      $scope.isRegistered = false;
      $cookies.user = args.user.email;
      $location.path('/main');
    });
  });

  $scope.$on('auth:fail', function(event, args) {
    $timeout(function() {
      $scope.error_code = args.error.code;
    });
  });

  $scope.loginMe = function(email, password) {
    Auth.sally.login('password', {
      email: email,
      password: password
    });
  };

  $scope.registerMe = function(email, password) {
    Auth.sally.createUser(email, password, function(error, user) {
      $timeout(function() {
        if (error) {
          $scope.$broadcast('auth:fail', {
            error: error
          });
        } else {
          $scope.email = $scope.password = '';
          $scope.isRegistered = true;
        }
      });
    });
  };
});