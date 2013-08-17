'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('deviceFinderApp'));

  var MainCtrl,
    $scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: $scope
    });
    $scope.user = '172.18.11.226';
    $scope.owners = [
      { user: '172.18.11.226', name: 'Amit Gharat' },
      { user: '172.18.11.228', name: 'Shripad Joshi' }
    ];
    $scope.devices = [
      { id: 1, name: 'iPad 2 iOS6', device: 'HMHHKHHMHHKH37', hold: 'none' },
      { id: 2, name: 'iPad 3 iOS5', device: 'HMHHKHHMHHKH39', hold: 'none' },
      { id: 3, name: 'iPad 3 iOS6', device: 'HMHHKHHMHHKH45', hold: 'none' }
    ];
    $scope.holders = [
      { user: '172.18.11.226', deviceId: 1, timespan: 30, startAt: new Date().getTime() },
      { user: '172.18.11.227', deviceId: 2, timespan: 60, startAt: new Date().getTime() }
    ];
  }));

  it('should return timespan in minutes', function () {
    expect($scope.timespan()).toBe(30);
    expect($scope.timespan('30 Minutes')).toBe(30);
    expect($scope.timespan('1 Hour')).toBe(60);
    expect($scope.timespan('2 Hours')).toBe(120);
    expect($scope.timespan('3 Hours')).toBe(180);
    expect($scope.timespan('4 Hours')).toBe(240);
    expect($scope.timespan('Whole Day')).toBe(480);
    expect($scope.timespan('2 Days')).toBe(960);
  });

  it('should return timespan in human readable format', function () {
    expect($scope.timespan('', true)).toBe('30 Minutes');
    expect($scope.timespan(30, true)).toBe('30 Minutes');
    expect($scope.timespan(60, true)).toBe('1 Hour');
    expect($scope.timespan(120, true)).toBe('2 Hours');
    expect($scope.timespan(180, true)).toBe('3 Hours');
    expect($scope.timespan(240, true)).toBe('4 Hours');
    expect($scope.timespan(480, true)).toBe('Whole Day');
    expect($scope.timespan(960, true)).toBe('2 Days');
  });

  it('should check if particular user owns a device', function() {
    expect($scope.isHeld(1, '172.18.11.226')).toBeTruthy();
    expect($scope.isHeld(2, '172.18.11.226')).toBeFalsy();
    expect($scope.isHeld(2, '172.18.11.227')).toBeTruthy();
  });

  it('should check if any user owns a device', function() {
    expect($scope.isHeld(1)).toBeTruthy();
    expect($scope.isHeld(2)).toBeTruthy();
    expect($scope.isHeld(3)).toBeFalsy();
  });

  it('should buy a device for particular user', function() {
    $scope.user = '172.18.11.228';

    expect($scope.holders.length).toBe(2);
    $scope.buy(1, '1 Hour');
    expect($scope.holders.length).toBe(3);
    expect($scope.devices[0].hold).toBe('me');
  });

  it('should update the device for particular user', function() {
    $scope.user = '172.18.11.226';

    expect($scope.holders.length).toBe(2);
    expect($scope.holders[0].timespan).toBe(30);
    $scope.buy(1, '1 Hour');
    expect($scope.holders[0].timespan).toBe(60);
  });

  it('should sell a device for particular user', function() {
    expect($scope.holders.length).toBe(2);
    $scope.sell(1);
    expect($scope.holders.length).toBe(1);
    expect($scope.devices[1].hold).toBe('none');
  });
});
