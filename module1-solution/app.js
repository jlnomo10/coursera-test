(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchItem = "";
  $scope.stateOfItems = "";
  $scope.messageColor = "";

  $scope.checkIfTooMuch = function () {
    var status = "";
    var totalItems = countItems($scope.lunchItem);
    $scope.messageColor = "green";

    if(totalItems == 0)
    {
      status = "Please enter data first";
      $scope.messageColor = "red";
    }
    else if(totalItems > 0 && totalItems <= 3)
    {
      status = "Enjoy!";
    }
    else
    {
      status = "Too much!";
    }

    $scope.stateOfItems = status;
  };

  var countItems = function(string){
    var totalItems = 0;
    if(string.length > 0)
    {
      var items = string.split(',');
      totalItems = items.length;
    }
    
    return totalItems;
  };

  $scope.cleanOnFocus = function () {
    $scope.stateOfItems = "";
    $scope.messageColor = "";
  };
}

})();
