'use strict';

describe('Filter: deviceNameById', function () {

  // load the filter's module
  beforeEach(module('apparatusApp'));

  // initialize a new instance of the filter before each test
  var deviceNameById, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    deviceNameById = $filter('deviceNameById');
    $scope = $rootScope.$new();
  }));

  it('should return a device name by deviceId', function () {
    $scope.devices = [
      { id: 1, name: 'iPad 2 iOS6', device: 'HMHHKHHMHHKH37', hold: 'none' },
      { id: 2, name: 'iPad 3 iOS5', device: 'HMHHKHHMHHKH39', hold: 'none' },
      { id: 3, name: 'iPad 3 iOS6', device: 'HMHHKHHMHHKH45', hold: 'none' }
    ];

    expect(deviceNameById($scope.devices, 1)).toBe('iPad 2 iOS6');
    expect(deviceNameById($scope.devices, 2)).toBe('iPad 3 iOS5');
    expect(deviceNameById($scope.devices, 3)).toBe('iPad 3 iOS6');
  });
});
