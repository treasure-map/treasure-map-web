'use strict';

describe('Controller: EditCtrl', function () {

  // load the controller's module
  beforeEach(module('treasuremapApp'));

  var NewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCtrl = $controller('EditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
