'use strict';

describe('Filter: deviceByCategory', function () {

  // load the filter's module
  beforeEach(module('apparatusApp'));

  // initialize a new instance of the filter before each test
  var deviceByCategory, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    deviceByCategory = $filter('deviceByCategory');
    $scope = $rootScope.$new();
  }));

  it('should return filter devices by category', function () {
    $scope.devices = [
      { id: 1, category: 'iPad', name: 'iPad 2 iOS6', device: 'HMHHKHHMHHKH37' },
      { id: 2, category: 'iPad', name: 'iPad 3 iOS5', device: 'HMHHKHHMHHKH39' },
      { id: 3, category: 'Android', name: 'Samsung Nexus 4', device: 'HMHHKHHMHHKH45' }
    ];

    expect(deviceByCategory($scope.devices, ['iPad']).length).toBe(2);
    expect(deviceByCategory($scope.devices, ['Android']).length).toBe(1);
    expect(deviceByCategory($scope.devices, ['iPad', 'Android']).length).toBe(3);
    expect(deviceByCategory($scope.devices, []).length).toBe(3);
  });
});
