'use strict';

describe('Controller: NewCtrl', function () {

  // load the controller's module
  beforeEach(module('treasuremapApp'));

  var NewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCtrl = $controller('NewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('should create new location', function(){
    var location = {
      address: {
        street: 'Paul-Lincke-Ufer 21',
        city: 'Berlin',
        zipcode: '10999'
      },
      coordinates: {
        lat: 52.4942,
        lng: 13.42957
      },
      details: {
        name: 'Restaurant VOLT',
        category: '',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ',
        pictures: ['http://friedrichshainblog.de/wp-content/uploads/2011/01/elfia-bar-und-restaurant-berlin-friedrichshain.jpg', 'http://www.berlin.de/binaries/adressen/70673/source/1355764576/667x500/'],
        duration: 3
      }
    };
    scope.form.$valid = true;
    scope.newLocation = location;
    expect(scope.addLocation.details.name).toEquals(location.details.name);
  });
  /*
  it('should create new location', function(){

  });

  it('should find a address', function(){

  });

  it('should not create location due to missing details', function(){

  });*/

});
