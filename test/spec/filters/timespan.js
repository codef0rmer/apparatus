'use strict';

describe('Filter: timespan', function () {

  // load the filter's module
  beforeEach(module('apparatusApp'));

  // initialize a new instance of the filter before each test
  var timespan, $scope;
  beforeEach(inject(function ($filter, $rootScope) {
    timespan = $filter('timespan');
    $scope = $rootScope.$new();
  }));

  it('should return timespan in minutes', function () {
    expect(timespan()).toBe(30);
    expect(timespan('30 Minutes')).toBe(30);
    expect(timespan('1 Hour')).toBe(60);
    expect(timespan('2 Hours')).toBe(120);
    expect(timespan('3 Hours')).toBe(180);
    expect(timespan('4 Hours')).toBe(240);
    expect(timespan('Whole Day')).toBe(480);
    expect(timespan('2 Days')).toBe(960);
  });

  it('should return timespan in human readable format', function () {
    expect(timespan('', true)).toBe('30 Minutes');
    expect(timespan(30, true)).toBe('30 Minutes');
    expect(timespan(60, true)).toBe('1 Hour');
    expect(timespan(120, true)).toBe('2 Hours');
    expect(timespan(180, true)).toBe('3 Hours');
    expect(timespan(240, true)).toBe('4 Hours');
    expect(timespan(480, true)).toBe('Whole Day');
    expect(timespan(960, true)).toBe('2 Days');
  });
});
