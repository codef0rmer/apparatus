'use strict';

describe('Filter: devicesInUse', function () {

  // load the filter's module
  beforeEach(module('apparatusApp'));

  // initialize a new instance of the filter before each test
  var devicesInUse, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    devicesInUse = $filter('devicesInUse');
    $scope = $rootScope.$new();
  }));

  it('check device is in use or not by particular/any user', function () {
    $scope.holders = [
      { user: '172.18.11.226', deviceId: 1, timespan: 30, startAt: new Date().getTime() },
      { user: '172.18.11.227', deviceId: 2, timespan: 60, startAt: new Date().getTime() }
    ];

    expect(devicesInUse($scope.holders, 1, '172.18.11.226')).toBeTruthy();
    expect(devicesInUse($scope.holders, 1, '172.18.11.227')).toBeFalsy();
    expect(devicesInUse($scope.holders, 2)).toBeTruthy();
  });
});
