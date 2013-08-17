'use strict';

angular.module('deviceFinderApp')
  .filter('owner', function () {
    return function (owners, user) {
      try {
        return owners.filter(function(owner) {
          return owner.user === user;
        })[0].name;
      } catch (e) {
        return user;
      }
    };
  });
