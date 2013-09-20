'use strict';

App.controller('MainCtrl', function($scope, $timeout, $cookies, angularFireCollection, $filter, CONFIG) {
  $scope.user = $cookies.user;

  $scope.holders = angularFireCollection(new Firebase(CONFIG.firebase + '/holders'), function() {
    $timeout(function() {
      $scope.devices = CONFIG.devices;
      $scope.devices.forEach(function(device, i) {
        if ($scope.isHeld(device.id, $scope.user)) {
          $scope.devices[i].hold = 'me';
        } else if ($scope.isHeld(device.id)) {
          $scope.devices[i].hold = 'you';
        } else {
          $scope.devices[i].hold = 'none';
        }
      });

      $scope.categories = _.map(_.groupBy($scope.devices, function(device) {
        return device.category;
      }), function(devices, category) {
        return category;
      });

      $scope.filters = [];
    });
  });

  $scope.buy = function(deviceId, timespan) {
    var holder = $filter('holderByDeviceId')($scope.holders, deviceId);

    if (holder && holder.user === $scope.user) {
      $scope.holders.update({
        $ref: holder.$ref,
        user: $scope.user,
        deviceId: deviceId,
        timespan: $filter('timespan')(timespan),
        startAt: new Date().getTime()
      });
    } else if (!$scope.isHeld(deviceId)) {
      $scope.holders.add({
        user: $scope.user,
        deviceId: deviceId,
        timespan: $filter('timespan')(timespan),
        startAt: new Date().getTime()
      });

      _.each($scope.devices, function(item, i) {
        if (item.id === deviceId) {
          $scope.devices[i].hold = 'me';
        }
      });
    }
  };

  $scope.sell = function(deviceId) {
    var holder = $filter('holderByDeviceId')($scope.holders, deviceId);

    if (holder && holder.user !== $scope.user) return;

    $scope.holders.remove({
      $ref: holder.$ref
    });

    _.each($scope.devices, function(item, i) {
      if (item.id === deviceId) {
        $scope.devices[i].hold = 'none';
      }
    });
  };

  $scope.isHeld = function(deviceId, user) {
    return $filter('devicesInUse')($scope.holders, deviceId, user);
  };

  $scope.isDeviceAvailable = function() {
    return _.filter($scope.devices, function(device) {
      return device.hold !== 'you';
    }).length > 0;
  };

  $scope.isDeviceInUse = function() {
    return _.filter($scope.holders, function(holder) {
      return !$scope.isHeld(holder.deviceId, $scope.user);
    }).length > 0;
  };

  $scope.filterIt = function(category) {
    var index = _.indexOf($scope.filters, category);

    if (index !== -1) {
      $scope.filters.splice(index, 1);
    } else {
      $scope.filters.push(category);
    }
  };

  $scope.$watch('holders.length', function(newVal) {
    if (newVal && $scope.devices) {
      $scope.devices.forEach(function(device, i) {
        if ($scope.isHeld(device.id, $scope.user)) {
          $scope.devices[i].hold = 'me';
        } else if ($scope.isHeld(device.id)) {
          $scope.devices[i].hold = 'you';
        } else {
          $scope.devices[i].hold = 'none';
        }
      });
    }
  });
});