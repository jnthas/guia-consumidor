angular.module('starter.controllers', [])

.controller('PricesCtrl', function($scope, Database) {

  Database.all().then(function (data) {

    var prices = data;

    console.log(prices);

    $scope.categories = _.uniq(_.map(prices.products, function (p) {
      return p.category;
    }));
  }); 
  
})

.controller('ChecklistCtrl', function($scope) {

})

.controller('ProductCtrl', function($scope, Database, $stateParams) {
  console.log($stateParams.id);

  Database.all().then(function (data) {
    var prices = data;

    $scope.product = _.find(prices.products, {id: $stateParams.id});
    $scope.markets = prices.markets;

    
  });


})

.controller('CategoriesCtrl', function($scope, Database, $stateParams) {

  Database.all().then(function (data) {
    var prices = data;
    var products = _.filter(prices.products, {category: $stateParams.name});

    $scope.products = products;
  });

  $scope.categoryName = $stateParams.name;
})

.controller('ConfigCtrl', function($scope) {

});
