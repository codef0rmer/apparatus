'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('apparatusApp'));

  var MainCtrl,
    $scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $cookies) {
    $scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: $scope,
      $cookies: $cookies
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

  // Need to inject FirebaseCollection to test it
  // 
  // it('should buy a device for particular user', function() {
  //   $scope.user = '172.18.11.228';

  //   expect($scope.holders.length).toBe(2);
  //   // bought by someone else
  //   $scope.buy(1, '1 Hour');
  //   expect($scope.holders.length).toBe(2);

  //   // not bought by anybody yet
  //   $scope.buy(3, '1 Hour');
  //   expect($scope.holders.length).toBe(3);
  // });

  // it('should update the device for particular user', function() {
  //   $scope.user = '172.18.11.226';

  //   expect($scope.holders.length).toBe(2);
  //   expect($scope.holders[0].timespan).toBe(30);
  //   $scope.buy(1, '1 Hour');
  //   expect($scope.holders[0].timespan).toBe(60);
  // });

  // it('should sell a device by particular user', function() {
  //   expect($scope.holders.length).toBe(2);
  //   $scope.sell(1);
  //   expect($scope.holders.length).toBe(1);
  //   expect($scope.devices[1].hold).toBe('none');
  // });

  it('should check for available devices', function() {
    expect($scope.devices.length).toBe(3);

    // if owned by me
    $scope.devices.forEach(function(device, i) {
      $scope.devices[i].hold = 'me';
    });
    expect($scope.isDeviceAvailable()).toBeTruthy();

    // if owned by others
    $scope.devices.forEach(function(device, i) {
      $scope.devices[i].hold = 'you';
    });
    expect($scope.isDeviceAvailable()).toBeFalsy();
  });

  it('should check for in-use devices', function() {
    expect($scope.devices.length).toBe(3);
    
    // someone else bought it
    $scope.devices[0].hold = 'me';
    expect($scope.isDeviceAvailable()).toBeTruthy();

    // if owned by me
    $scope.devices.forEach(function(device, i) {
      $scope.devices[i].hold = 'me';
    });
    expect($scope.isDeviceAvailable()).toBeTruthy();

    // if owned by others
    $scope.devices.forEach(function(device, i) {
      $scope.devices[i].hold = 'you';
    });
    expect($scope.isDeviceAvailable()).toBeFalsy();
  });
});
