'use strict';

describe('Filter: holderByDeviceId', function () {

  // load the filter's module
  beforeEach(module('apparatusApp'));

  // initialize a new instance of the filter before each test
  var holderByDeviceId, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    holderByDeviceId = $filter('holderByDeviceId');
    $scope = $rootScope.$new();
  }));

  it('spew holders who own particular device', function () {
    $scope.holders = [
      { user: '172.18.11.226', deviceId: 1, timespan: 30, startAt: new Date().getTime() },
      { user: '172.18.11.227', deviceId: 2, timespan: 60, startAt: new Date().getTime() }
    ];

    expect(holderByDeviceId($scope.holders, 1).user).toBe('172.18.11.226');
  });
});
