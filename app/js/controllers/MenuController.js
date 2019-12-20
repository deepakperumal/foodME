'use strict';

foodMeApp.controller('MenuController', function MenuController(
  $scope,
  $routeParams,
  Restaurant,
  cart
) {
  $scope.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  
  var date = new Date();
  var currentDay = date.getDay();
  var time = startTime();

  $scope.isWorkingDay = restaurant => {
    if (typeof restaurant.days !== 'undefined')
    return (restaurant.days.includes(currentDay)  && (Date.parse('01/01/2011 '+restaurant.opens)<=Date.parse('01/01/2011 '+time) && Date.parse('01/01/2011 '+restaurant.closes)>=Date.parse('01/01/2011 '+time) )  )?'Open':'Closed'
  };

  function checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ':' + m + ':' + s;
    t = setTimeout(function() {
      startTime();
    }, 500);
  }

  $scope.getDays = days => {
    var temp = [];
    if (typeof days !== 'undefined')
      days.map(x => {
        temp.push($scope.days[x]);
      });

    return temp.join();
  };

  $scope.restaurant = Restaurant.get({ id: $routeParams.restaurantId });

  $scope.cart = cart;
});
