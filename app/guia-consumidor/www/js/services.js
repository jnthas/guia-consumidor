angular.module('starter.services', [])

.factory('Database', function ($http) {

  function getPrices() {

    return $http.get('080617.json').then(function(response) {
      return response.data;
    });

  }



  return {
    all: function() {
      return getPrices();
    }
  };
});
