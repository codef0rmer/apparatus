'use strict';

angular.module('apparatusApp')
  .controller('MainCtrl', function ($scope, $timeout, $cookies, angularFireCollection, CONFIG) {
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
      var holder = $scope.getHolder(deviceId);

      if (holder && holder.user === $scope.user) {
        $scope.holders.update({
          $ref: holder.$ref,
          user: $scope.user,
          deviceId: deviceId,
          timespan: $scope.timespan(timespan),
          startAt: new Date().getTime()
        });
      } else if (!$scope.isHeld(deviceId)) {
        $scope.holders.add({
          user: $scope.user,
          deviceId: deviceId,
          timespan: $scope.timespan(timespan),
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
      var holder = $scope.getHolder(deviceId);

      if (holder && holder.user !== $scope.user) return;

      $scope.holders.remove({ $ref: holder.$ref });

      _.each($scope.devices, function(item, i) {
        if (item.id === deviceId) {
          $scope.devices[i].hold = 'none';
        }
      });
    };

    $scope.getHolder = function(deviceId) {
      return _.findWhere($scope.holders, { deviceId: deviceId });
    };

    $scope.isHeld = function(deviceId, user) {
      if (angular.isDefined(user)) {
        return angular.isDefined(_.findWhere($scope.holders, { user: user, deviceId: deviceId }));        
      } else {
        return angular.isDefined(_.findWhere($scope.holders, { deviceId: deviceId }));        
      }
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

    $scope.timespan = function(timespan, humanReadable) {
      var time;

      if (humanReadable) {
        switch(timespan) {
          case 30:
            time = '30 Minutes';
            break;
          case 60:
            time = '1 Hour';
            break;
          case 120:
            time = '2 Hours';
            break;
          case 180:
            time = '3 Hours';
            break;
          case 240:
            time = '4 Hours';
            break;
          case 480:
            time = 'Whole Day';
            break;
          case 960:
            time = '2 Days';
            break;
          case 999999999999:
            time = 'Forever';
            break;
          default:
            time = '30 Minutes';
            break;
        }
      } else {
        switch(timespan) {
          case '30 Minutes':
            time = 30;
            break;
          case '1 Hour':
            time = 60;
            break;
          case '2 Hours':
            time = 120;
            break;
          case '3 Hours':
            time = 180;
            break;
          case '4 Hours':
            time = 240;
            break;
          case 'Whole Day':
            time = 480;
            break;
          case '2 Days':
            time = 960;
            break;
          case 'Forever':
            time = 999999999999;
            break;
          default:
            time = 30;
            break;
        }        
      }
      
      return time;
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
