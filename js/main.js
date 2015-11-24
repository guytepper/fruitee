(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var drag = require('draggabilly');

var fruits = document.getElementsByClassName('frt-item');

(function(fruits) {
  var fruitsArr = [],
  statusElm = document.getElementById('status');
  Array.prototype.checkCombination = function() {
        
    Array.prototype.hasFruits = function() {
      return this.indexOf('sweet') != -1 || types.indexOf('sub-acid') != -1 || types.indexOf('acid') != -1;
    };
    Array.prototype.hasSweet = function() {
      return this.indexOf('sweet') != -1;
    };
    Array.prototype.hasSubAcid = function() {
      return this.indexOf('sub-acid') != -1;
    };
    Array.prototype.hasAcid = function() {
      return this.indexOf('acid') != -1;
    };
    Array.prototype.hasFat = function() {
      return this.indexOf('fat') != -1;
    };
    Array.prototype.hasMelon = function() {
      return this.indexOf('melon') != -1;
    };
        
    var types = removeDuplicates(this.map(function(fruit) {
      return fruit.type;
    }));


    if ( types.hasFat() && types.hasFruits() ) return false;
    if ( types.hasMelon() && types.length > 1 ) return false;
    if ( types.hasAcid() && types.hasSweet() ) return false;
    return true;
    
  };
  
  Array.prototype.add = function(fruit) {
    this.push(fruit); 
    var status = this.checkCombination();
    updateStatusText(status);
    console.log("Combination Add: " + status);
  };
  
  Array.prototype.drop = function(fruit) {
    this.splice(this.indexOf(fruit), 1);    
    var status = this.checkCombination();
    updateStatusText(status);
    console.log("Combination Remove: " + this.checkCombination());    
  };

  function updateStatusText(status) {
    statusElm.textContent = status;
  }

  for ( var i = 0 ; i < fruits.length ; i++ ) {
    var fruit = { 
      name : fruits[i].dataset.fruitName,
      type : fruits[i].dataset.fruitType
    };
    var checkbox = fruits[i].childNodes[1];
    fruits[i].addEventListener('click', currentFruits(fruits[i], fruit, checkbox));
    checkbox.addEventListener('click', fruitChecked(fruits[i], checkbox), true);
  }

  function currentFruits (div, fruit, checkbox) {
    return function(event) {
      if ( checkbox.checked != 1 ) {
        // div.style.backgroundColor = "rgba(183,232,134,0.62)";
        fruitsArr.add(fruit);
        moveFruit(div, 'selected-fruits');

      }

      else {
        fruitsArr.drop(fruit);
        moveFruit(div, 'fruits');
      }

    };    
   }

   function fruitChecked(fruit, checkbox) {
    return function(event) {
      event.stopPropagation();

      if ( checkbox.checked == 1 ) {
       fruit.className += " checked";
      }
      else {
        console.log('unchecked');
      }
    }
   }

  function moveFruit(fruit, dest) {
    var container = document.getElementById(dest);
    // var foo = fruit.cloneNode(true);
    container.appendChild(fruit);
    // fruits.appendChild(foo);
  }

  function removeDuplicates(arr) {
    var out = [],
        obj = {};
    
    for ( var i = 0 ; i < arr.length ; i++ ) {
      obj[arr[i]] = 0;      
    }
    
    for ( i in obj ) {
      out.push(i);
    }
    
    return out;
  }
})(fruits);

// (function Draggy(fruits, Draggabilly) {
//   var draggies = [];
//   for ( var i = 0; i < fruits.length; i++ ) {
//     var elm = fruits[i];
//     var draggie = new Draggabilly( elm, {
//       // options...
//   });
//   draggies.push( draggie );
// }
// console.log(draggies);
// })(fruits, drag);

},{}]},{},[1]);
