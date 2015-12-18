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
  var lastAnd = str.lastIndexOf(' and');
  if ( lastAnd != -1 ) {
    var commas = str.substr(0, lastAnd);
    commas = commas.replace(/ and/g, ',');
    str = commas + str.substr(lastAnd);
  }
  return str;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

    catch (info) {
      var msg = "";

      if ( info.customMsg ) {
        msg = info.customMsg
      }

      else {

        if ( info.start ) {
          msg += info.start;
        }

        if ( info.var1 ) {
          msg += info.var1;

          msg += ' (';

          this.arr.forEach(function( frt ) {
            if ( frt.type == info.var1 )
              msg += frt.name + ', ';
          });

          msg += ') ';
        }

        if ( info.var2 ) {
          msg += ' and ' + info.var2;
        }

        if ( info.end ) {
          msg += ' ' + info.end;
        }

      }

      console.log( capitalize(msg) );
      return info.status;
    }

    return status;
  },

  get fruits() {
    var fruitsArr = this.arr.filter( function( frt ) {
      return frt.type == 'sweet' || 'sub-acid' || 'acid';
    });
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

  var infoMsg = function(status, start, var1, var2, end, customMsg) {

    this.status = status;
    this.start = start;
    this.var1 = var1;
    this.var2 = var2;
    this.end = end;
    this.customMsg = customMsg;

  }

  Array.prototype.checkCombination = function() {

    if ( combination.has('melon') && combination.arr.length > 1 ) {
      throw new infoMsg(false, null, 'melons', null, 'should not be consumed with any other foods.');
    } 

    if ( combination.has('fat') && combination.has('fruits') ) { 
      throw new infoMsg(false, null, 'fat', 'fruits', 'should not be consumed together.');
    }

    if ( combination.has('acid') && combination.has('sweet') ) {
      // throw new infoMsg(['acid', 'sweet'], 'is a pretty bad idea.', false);
    }
    if ( combination.has('fruits') && combination.has('veggie') ) {
      // throw new infoMsg(['veggie'], 
            // 'and fruits is usually not recommended - eat with caution.', 'not-rc');
    }
    // add diffrent response - it's not bad, but not recommended (fair?)
    if ( combination.has('fruits') && combination.has('stretchy') ) {
      // throw new infoMsg(['stretchy'], 
            // 'and fruits is not recommended - eat with caution.', false);
    }

    if ( combination.has('cruci') && combination.has('fruits') ) {
      // throw new infoMsg(['cruci'], 
            // 'and fruits is not recommended - eat with caution.', false);
    }

    if ( combination.has('cruci') ) {
      // throw new infoMsg(['cruci'], 
            // 'can be hard to digest - eat with caution.', 'not-rc');
      // return 'not-rc';
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