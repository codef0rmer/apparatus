'use strict';

describe('Filter: owner', function () {

  // load the filter's module
  beforeEach(module('deviceFinderApp'));

  // initialize a new instance of the filter before each test
  var owner, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    owner = $filter('owner');
    $scope = $rootScope.$new();
  }));

  it('should return an owner name by user/IP', function () {
    $scope.owners = [
      { user: '172.18.11.226', name: 'Amit Gharat' },
      { user: '172.18.11.227', name: 'Shripad Joshi' }
    ];

    expect(owner($scope.owners, '172.18.11.226')).toBe('Amit Gharat');
    expect(owner($scope.owners, '172.18.11.227')).toBe('Shripad Joshi');

    // If does not match, should return the user/IP
    expect(owner($scope.owners, '172.18.11.228')).toBe('172.18.11.228');
  });
});
