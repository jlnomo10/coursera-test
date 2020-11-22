(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
       items: '<',
       onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
    var list = this;
  
    list.itemsInList = function () {
        if (list.items.length == 0) {
            return true;
        }
        else
        {
            return false;
        }
    };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrowIt = this;
    narrowIt.term = "";
    narrowIt.found = [];

    narrowIt.searchTermInMenu = function () {
        if(narrowIt.term.length == 0)
        {
            narrowIt.found = [];
            return false;
        }

        var promise = MenuSearchService.getMatchedMenuItems(narrowIt.term);

        promise.then(function (serviceResponse) {
            narrowIt.found = serviceResponse;
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    narrowIt.removeItem = function (itemIndex) {
        narrowIt.found.splice(itemIndex, 1);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http(
            {
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var allItems = result.data;
                var foundItems = [];
                allItems.menu_items.forEach(filterFunction);

                function filterFunction(item, index) {
                    if(item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                    {
                        foundItems.push(item);
                    }
                }
                // return processed items
                return foundItems;
            });
    }
}

})();