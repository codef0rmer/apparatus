'use strict';

angular.module('deviceFinderApp')
  .controller('MainCtrl', function ($scope, angularFire) {
    $scope.user = '172.18.11.226';
    $scope.owners = [
      { user: '172.18.11.226', name: 'Amit Gharat' }
    ];

    angularFire('https://dide.firebaseio.com/holders', $scope, 'holders').then(function() {
      $scope.devices = [
        { id: 1, name: 'iPad 2 iOS6', device: 'HMHHKHHMHHKH37', hold: 'none' },
        { id: 2, name: 'iPad 3 iOS5', device: 'HMHHKHHMHHKH39', hold: 'none' },
        { id: 3, name: 'iPad 3 iOS6', device: 'HMHHKHHMHHKH45', hold: 'none' }
      ];
    });


    $scope.buy = function(deviceId, timespan) {
      var device = _.filter($scope.devices, function(device) {
            return device.id === deviceId;
          })[0];

      if ($scope.isHeld(deviceId, $scope.user)) {
        $scope.holders.forEach(function(item, i) {
          if (item.user === $scope.user && item.deviceId === deviceId) {
            $scope.holders[i]['timespan'] = $scope.timespan(timespan);
            $scope.holders[i]['startAt'] = new Date().getTime();
          }
        });
      } else {
        $scope.holders.push({
          user: $scope.user,
          deviceId: device.id,
          timespan: $scope.timespan(timespan),
          startAt: new Date().getTime()
        });

        _.each($scope.devices, function(item, i) {
          if (item.id === device.id) {
            $scope.devices[i].hold = 'me';
          }
        });
      }
    };

    $scope.sell = function(deviceId) {
      $scope.holders = _.reject($scope.holders, function(item) {
        return item.user === $scope.user && item.deviceId === deviceId;
      });

      _.each($scope.devices, function(item, i) {
        if (item.id === deviceId) {
          $scope.devices[i].hold = 'none';
        }
      });
    };

    $scope.isHeld = function(deviceId, user) {
      if (angular.isDefined(user)) {
        return angular.isDefined(_.findWhere($scope.holders, { user: user, deviceId: deviceId }));        
      } else {
        return angular.isDefined(_.findWhere($scope.holders, { deviceId: deviceId }));        
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
          default:
            time = 30;
            break;
        }        
      }

      
      return time;
    };

    $scope.$watch('holders', function(newVal) {
      if (newVal) {
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
