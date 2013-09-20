'use strict';

FiltersModule.filter('holderByDeviceId', function() {
  return function(holders, deviceId) {
    return _.findWhere(holders, {
      deviceId: deviceId
    });
  }
});