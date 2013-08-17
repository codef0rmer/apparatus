'use strict';

describe('Filter: device', function () {

  // load the filter's module
  beforeEach(module('deviceFinderApp'));

  // initialize a new instance of the filter before each test
  var device, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    device = $filter('device');
    $scope = $rootScope.$new();
  }));

  it('should return a device name by deviceId', function () {
    $scope.devices = [
      { id: 1, name: 'iPad 2 iOS6', device: 'HMHHKHHMHHKH37', hold: 'none' },
      { id: 2, name: 'iPad 3 iOS5', device: 'HMHHKHHMHHKH39', hold: 'none' },
      { id: 3, name: 'iPad 3 iOS6', device: 'HMHHKHHMHHKH45', hold: 'none' }
    ];

    expect(device($scope.devices, 1)).toBe('iPad 2 iOS6');
    expect(device($scope.devices, 2)).toBe('iPad 3 iOS5');
    expect(device($scope.devices, 3)).toBe('iPad 3 iOS6');
  });
});
