'use strict';

angular.module('apparatusApp')
  .filter('deviceByCategory', function () {
    return function (devices, filters) {
      var filteredDevices = [];

      if (devices && filters && filters.length > 0) {
        devices.forEach(function(device) {
          if (_.indexOf(filters, device.category) !== -1) {
            filteredDevices.push(device);
          }
        });
      } else {
        filteredDevices = devices;
      }

      return filteredDevices;
    };
  });
