var view = {
  fruits: document.getElementsByClassName('frt-item'),
  statusElm: document.getElementById('status'),
  selectedFruits: document.getElementById('selected-fruits'),
  fruitsDiv: document.getElementById('fruits'),
  
  updateStatusText: function() {
    var status = combination.status;
    if (status == true) this.statusElm.textContent = 'Great!';
    else this.statusElm.textContent = 'Bad';
    this.statusElm.className = status;
  },

  moveFruit: function(fruit, dest) {
    this[dest].appendChild(fruit);
  }
};

(function() { 
  Array.prototype.unique = function() {
    var out = [],
        obj = {};

    this.forEach(function(value) { 
      obj[value] = 0; 
    });

    for ( var i in obj ) {
      out.push(i);
    }

    return out;
  };

  Array.prototype.add = function(fruit) {
    this.push(fruit);
    view.updateStatusText();
  };

  Array.prototype.drop = function(fruit) {
    this.splice(this.indexOf(fruit), 1);    
    view.updateStatusText();
  };

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
        
    var types = this.map(function(fruit) {
      return fruit.type;
    }).unique();

    if ( types.hasFat() && types.hasFruits() ) return false;
    if ( types.hasMelon() && types.length > 1 ) return false;
    if ( types.hasAcid() && types.hasSweet() ) return false;
    return true; 
  };
})();

var combination = {
  arr: [],
  combination: false,
  get status() {
    this.combination = this.arr.checkCombination();
    return this.combination;
  },
};

// Event Attacher
Array.prototype.forEach.call(view.fruits, function(fruitDiv) {
  var fruit = {
    name : fruitDiv.id,
    type : fruitDiv.dataset.fruitType
  };
  fruitDiv.fruit = fruit;
  fruitDiv.addEventListener('click', currentFruits(fruitDiv, fruit));
});

function currentFruits (div, fruit) {
  return function(event) {
    if ( div.getAttribute('aria-checked') != 'true' ) {
      combination.arr.add(fruit);
      view.moveFruit(div, 'selectedFruits');
      div.setAttribute('aria-checked', 'true');
    }

    else {
      div.setAttribute('aria-checked', 'false');
      combination.arr.drop(fruit);
      view.moveFruit(div, 'fruitsDiv');
    }
  };    
}