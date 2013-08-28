'use strict';

angular.module('apparatusApp')
  .factory('Auth', function (CONFIG, $rootScope) {
    return {
      sally: null,

      init: function() {
        this.sally = new FirebaseSimpleLogin(new Firebase(CONFIG.firebase), function(error, user) {
          if (error) {
            $rootScope.$broadcast('auth:fail', {error: error});
          } else if (user) {
            $rootScope.$broadcast('auth:login', {user: user});
          } else {
            $rootScope.$broadcast('auth:logout', {});
          }
        });
      }
    };
  });
