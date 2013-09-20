'use strict';

FiltersModule.filter('devicesInUse', function() {
  return function(holders, deviceId, user) {
    if (angular.isDefined(user)) {
      return angular.isDefined(_.findWhere(holders, {
        user: user,
        deviceId: deviceId
      }));
    } else {
      return angular.isDefined(_.findWhere(holders, {
        deviceId: deviceId
      }));
    }
  }
});