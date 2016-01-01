var attachFastClick = Origami.fastclick;
attachFastClick(document.body);

var view = {
  fruits: document.getElementsByClassName('frt-item'),
  statusElm: document.getElementById('status'),
  combinationElm: document.getElementById('combination'),
  selectedFruits: document.getElementById('selected-fruits'),
  fruitsDiv: document.getElementById('fruits'),
  info: document.getElementById('info'),
  message: document.getElementById('message'),
  msgDisplayed: false,

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
          this.statusElm.textContent = 'Fair';
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addPlural(str) {
  var lastChar = str.charAt(str.length - 1);

  if ( lastChar != 's' && lastChar != 'y' ) {
    return str + 's';
  }

  return str;
}

function swapWords(msg) {
  if ( msg.indexOf('crucis') > -1 )
    return msg.replace(/cruci/, 'Cruciferous vegetables');
  if ( msg.indexOf('starchy') > -1 )
    return msg.replace(/starchy/, 'starchy foods');
  return msg;
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

    // generate information msg
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
          msg += addPlural(info.var1);

          msg += ' (';

          this.type(info.var1).forEach(function( frt, index, arr ) {
              msg += capitalize(frt.name);
              if ( arr.length - 1 != index ) msg += ', ';
          });

          msg += ')';
        }

        if ( info.var2 ) {
          msg += ' and ' + addPlural(info.var2);

          msg += ' (';

          this.type(info.var2).forEach(function( frt, index, arr ) {
              msg += capitalize(frt.name);
              if ( arr.length - 1 != index ) msg += ', ';
          });

          msg += ')'
        }

        if ( info.end ) {
          msg += ' ' + info.end;
        }

      }

      view.message.textContent = capitalize(swapWords(msg));
      return info.status;
    }

    return status;
  },

  get fruits() {
    return this.arr.filter( function( frt ) {
      return ['sweet', 'sub-acid', 'acid'].indexOf(frt.type) > -1;
    });
  },

  type: function(type) {
    if (type == 'fruits') return this.fruits;
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
      throw new infoMsg(false, null, 'melon', null, 'should not be consumed with any other foods.');
    } 

    if ( combination.has('fat') && combination.has('fruits') ) { 
      throw new infoMsg(false, null, 'fat', 'fruits', 'should not be consumed together.');
    }

    if ( combination.has('acid') && combination.has('sweet') ) {
      throw new infoMsg(false, null, 'acid', 'sweet', 'should not be consumed together.')
    }
    if ( combination.has('fruits') && combination.has('veggie') ) {
      throw new infoMsg('not-rc', 'It is not recommended to consume ', 'fruits', 'veggie', 'together - eat with caution.');
    }
    // add diffrent response - it's not bad, but not recommended (fair?)
    if ( combination.has('fruits') && combination.has('starchy') ) {
      throw new infoMsg(false, null, 'fruits', 'starchy', 'should not be consumed together.');
    }

    if ( combination.has('cruci') && combination.has('fruits') ) {
      throw new infoMsg(false, null, 'cruci', 'fruits', 'should not be consumed together.');
    }

    if ( combination.has('cruci') ) {
      throw new infoMsg('not-rc', null, null, null, null, 'Cruciferous vegetables can be hard to digest - eat with caution.')
    }

    return true;
  };


// Event Attachers
var isTouch = touch_device(),
    eventName = isTouch ? 'touchend' : 'click';
    fingerMove = false;

if ( isTouch ) {
  Array.prototype.forEach.call(view.fruits, function(fruitDiv) {
    fruitDiv.addEventListener('touchmove', function(e) {
      e.stopPropagation();
      fingerMove = true;
    });

    fruitDiv.addEventListener('touchstart', function(e) {
      e.stopPropagation();      
      fingerMove = false;
    });  
  });
}

Array.prototype.forEach.call(view.fruits, function(fruitDiv) {
  var fruit = {
    name : fruitDiv.id,
    type : fruitDiv.getAttribute('data-fruit-type')
  };

  fruitDiv.addEventListener(eventName, currentFruits(fruitDiv, fruit));

});

function currentFruits (div, fruit) {
  return function fruitClick(event) {
    if ( div.getAttribute('aria-checked') != 'true' ) {
      if ( isTouch && fingerMove ) return;
      focusController.selectItem();
      combination.arr.add(fruit);
      view.moveFruit(div, 'selectedFruits');
      div.setAttribute('aria-checked', 'true'); 
      sendAnalyticsEvent(fruit.name);

    }

    else {
      if ( isTouch && fingerMove ) return;
      focusController.selectItem();
      div.setAttribute('aria-checked', 'false');
      combination.arr.drop(fruit);
      view.moveFruit(div, 'fruitsDiv');

    }
  };
}

function touch_device() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};

function sendAnalyticsEvent(frtName) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Fruit',
    eventAction: 'click',
    eventLabel: frtName
  });
}

// sets hover on .frt-item 
if ( !isTouch ) {
  view.fruitsDiv.className = "hover";
  view.selectedFruits.className = "hover";
}