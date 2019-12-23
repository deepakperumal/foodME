'use strict';

foodMeApp.controller('CheckoutController', function CheckoutController(
  $scope,
  cart,
  customer,
  $location
) {
  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.customer = customer;
  $scope.submitting = false;
  $scope.date = '';

  var element = angular.element('#date');
  element.keypress(function(e) {
    var elem = document.getElementById('date').value;

    if (elem.length > 6) e.preventDefault();

    if (elem.length == 1) {
      setTimeout(function() {
        document.getElementById('date').value += '/';
      }, 100);
    }
  });

  $scope.purchase = function() {
    if ($scope.submitting) return;

    $scope.submitting = true;
    cart.submitOrder().then(function(orderId) {
      $location.path('thank-you').search({ orderId: orderId });
    });
  };
});
