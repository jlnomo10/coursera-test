(function () {
  'use strict';
  
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyCon = this;
  
    buyCon.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
  
    buyCon.boughtItem = function (itemIndex) {
      var item = buyCon.itemsToBuy[itemIndex];
      ShoppingListCheckOffService.removeBuyItem(itemIndex);
      ShoppingListCheckOffService.addBoughtItem(item.name, item.quantity);
    }
  }
    
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtCon = this;
  
    boughtCon.itemsBought = ShoppingListCheckOffService.getBoughtItems();
  }
  
  function ShoppingListCheckOffService() {
    var service = this;
  
    // List of shopping items
    var items = [
                  { name: "cookies", quantity: 10 },
                  { name: "cakes", quantity: 5 }, 
                  { name: "candies", quantity: 3 },
                  { name: "popcicle", quantity: 1 },
                  { name: "orange juices", quantity: 7 }
                ];
  
    var boutghItems = [];

    service.addBoughtItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      boutghItems.push(item);
    };
  
    service.removeBuyItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };
  
    service.getItemsToBuy = function () {
      return items;
    };

    service.getBoughtItems = function () {
      return boutghItems;
    };
  }
  
  })();  