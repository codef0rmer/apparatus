'use strict';

angular.module('deviceFinderApp')
  .filter('device', function () {
    return function (devices, deviceId) {
    	return devices.filter(function(device) {
    		return device.id === deviceId;
    	})[0].name;
    };
  });
