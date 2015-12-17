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
          this.info.style.display = 'none';
          break;
        case false:
          this.statusElm.textContent = 'Bad';
          this.info.style.display = 'block';
          break;
        case 'not-rc':
          this.statusElm.textContent = 'Not recommended.';
          this.info.style.display = 'block';
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

function removeAnds(str) {
  var tmp = str.replace(/ and/, ',');
  var lastComma = tmp.lastIndexOf(',');
  if (  lastComma != -1 ) {
    tmp
  }
}

function capitalize(str) {
  var firstLetter = str.substring(0, 1).toUpperCase();
  var restStr = str.substring(1);
  return firstLetter + restStr;
}

function filterType(elm) {
    if (elm.type == this) return true;
}

var combination = {

  arr: [],

  get status() {
    var status;

    try {
       status = this.arr.checkCombination();
    }

    catch(msg) {
      var info = 'Eating '; // make a variable

      msg.types.forEach(function(type) {
        if (info.length > 7) info += 'and ';
        combination.type(type).forEach(function(frt, index) {
          if ( index > 0 ) info += '/ ';
          var name = frt.name + 's';
          info += name + ' ';

        });

        if ( combination.has(type) )
          info += '(' + type + ') ';

      });
      // console.log(info + msg.customMsg);
      view.message.textContent = info + msg.customMsg;
      return msg.status;
    }
    return status;
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
  
  // TODO: remove?
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

  var infoMsg = function(types, customMsg, status) {
    this.types = types;
    this.customMsg = customMsg;
    this.status = status;
  }
  Array.prototype.checkCombination = function() {

    if ( combination.has('melon') && combination.arr.length > 1 ) {
      throw new infoMsg(['melon'], 'is better eaten alone.', false);
    } 

    if ( combination.has('fat') && combination.has('fruits') ) { 
      throw new infoMsg(['fat', 'acid', 'sub-acid', 'sweet'], 'is a pretty bad combination.', false); // TODO: change acid to fruits
    }

    if ( combination.has('acid') && combination.has('sweet') ) {
      throw new infoMsg(['acid', 'sweet'], 'is a pretty bad idea.', false);
    }
    if ( combination.has('fruits') && combination.has('veggie') ) {
      throw new infoMsg(['veggie'], 
            'and fruits is usually not recommended - eat with caution.', 'not-rc');
    }
    // add diffrent response - it's not bad, but not recommended (fair?)
    if ( combination.has('fruits') && combination.has('stretchy') ) {
      throw new infoMsg(['stretchy'], 
            'and fruits is not recommended - eat with caution.', false);
    }

    if ( combination.has('cruci') && combination.has('fruits') ) {
      throw new infoMsg(['cruci'], 
            'and fruits is not recommended - eat with caution.', false);
    }

    if ( combination.has('cruci') ) {
      throw new infoMsg(['cruci'], 
            'can be hard to digest - eat with caution.', 'not-rc');
      return 'not-rc';
    }

    return true;
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