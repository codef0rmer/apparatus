'use strict';

angular.module('apparatusApp')
  .controller('ProfileCtrl', function ($scope, $timeout, Auth) {
    $scope.changePassword = function() {
      Auth.sally.changePassword($scope.change.email, $scope.change.current_password, $scope.change.new_password, function(error, success) {
        $timeout(function() {
          if (error) {
            $scope.error_code = error.code;
          } else {
            Auth.sally.logout();
          }
        });
      });
    };
  });
