'use strict';

describe('Service: locate', function () {

  // load the service's module
  beforeEach(module('treasuremapApp'));

  // instantiate service
  var locate;
  beforeEach(inject(function (_locate_) {
    locate = _locate_;
  }));

  it('should do something', function () {
    expect(!!locate).toBe(true);
  });

});
