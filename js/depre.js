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

  type: function(type) {
    return this.arr.filter(filterType, type);
  },

  has: function(type) {
    if ( type == 'fruits' ) {
      return this.type('sweet').length > 0 ||
             this.type('sub-acid').length > 0 ||
             this.type('acid').length > 0;
    }
    return this.arr.filter(filterType, type).length > 0;
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

    if ( combination.has('fat') && combination.has('fruits') ) return false;
    if ( combination.has('melon') && combination.arr.length > 1 ) return false;
    if ( combination.has('acid') && combination.has('sweet') ) return false;
    if ( combination.has('fruits') && combination.has('veggie') ) return 'not-rc';
    // add diffrent response - it's not bad, but not recommended (fair?)
    if ( combination.has('fruits') && combination.has('stretchy') ) return false;
    if ( combination.has('cruci') && combination.has('fruits') ) return false;
    if ( combination.has('cruci') ) return 'not-rc';
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