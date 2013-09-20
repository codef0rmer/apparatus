'use strict';

FiltersModule.filter('deviceNameById', function() {
  return function(devices, deviceId) {
    return devices && devices.filter(function(device) {
      return device.id === deviceId;
    })[0].name;
  };
});