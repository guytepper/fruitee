var view = {
  fruits: document.getElementsByClassName('frt-item'),
  statusElm: document.getElementById('status'),
  combinationElm: document.getElementById('combination'),
  selectedFruits: document.getElementById('selected-fruits'),
  fruitsDiv: document.getElementById('fruits'),
  info: document.getElementById('info'),
  message: document.getElementsByClassName('message')[0],
  
  updateStatusText: function() {

    if ( combination.arr.length == 0 ) {
      this.selectedFruits.innerHTML = '<h2>pick up some fruits!</h2>';
      this.statusElm.textContent = 'No fruit selected.'; // for accessbility
      this.combinationElm.style.visibility = 'hidden';
    }

    else {

      var status = combination.status;
      this.combinationElm.style.visibility = 'visible';

      switch ( status ) {
        case true:
          this.statusElm.textContent = 'Great!';
          break;
        case false:
          this.statusElm.textContent = 'Bad';
          break;
        case 'not-rc':
          this.statusElm.textContent = 'Not recommended.';
          break;
        default:
          console.log('Combination Error.');
      }

      this.statusElm.className = status;
    }
  },

  moveFruit: function(fruit, dest) {
    this[dest].appendChild(fruit);
  }
};

function filterType(elm) {
    if (elm.type == this) return true;
}

var combination = {

  arr: [],

  get status() {
    return this.arr.checkCombination();
  },

  get sweet() { 
    return this.arr.filter(filterType, 'sweet');
  },

  get subAcid() { 
    return this.arr.filter(filterType, 'sweet');
  },

  get acid() { 
    return this.arr.filter(filterType, 'sweet');
  },  

  get fat() {
    return this.arr.filter(filterType, 'fat');
  },

  has: function(type) {
    if ( type == 'fruits' )
      return this.sweet.length > 0 || this.subAcid.length > 0 || this.acid.length > 0;
    return this[type].length > 0;
  },
};

// (function() { 
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
    if ( this.length == 0 ) {
      view.selectedFruits.innerHTML = '';
    }
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

    Array.prototype.hasVeggies = function() { 
      return this.indexOf('veggie') != -1;
    };

    Array.prototype.hasStretch = function() {
      return this.indexOf('strechy') != -1;
    };

    Array.prototype.hasCruciferous = function() {
      return this.indexOf('cruci') != -1;
    };

    var types = this.map(function(fruit) {
      return fruit.type;
    }).unique();

    if ( combination.has('fat') && combination.has('fruits') ) return false;
    if ( types.hasMelon() && types.length > 1 ) return false;
    if ( types.hasAcid() && types.hasSweet() ) return false;
    if ( types.hasFruits() && types.hasVeggies() ) return 'not-rc';
    // add diffrent response - it's not bad, but not recommended (fair?)
    if ( types.hasFruits() && types.hasStretch() ) return false;
    if ( types.hasCruciferous() && types.hasFruits() ) return false;
    if ( types.hasCruciferous() ) return 'not-rc';
    return true; 
  };
// })();

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
  return function fruitClick(event) {
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