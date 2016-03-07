
// TODO: The whole combination logic & message generation needs to be refactored.
//       The current code is pretty spagethic.

// Add the fruit to the array
Array.prototype.add = function(fruit) {
  if ( this.length == 0 ) {
    view.selectedFruits.innerHTML = '';
  }

  this.push(fruit);
  view.updateStatusText();
};

// Remove the fruit from the array
Array.prototype.drop = function(fruit) {
  this.splice(this.indexOf(fruit), 1);
  view.updateStatusText();
};

function infoMsg(status, start, var1, var2, end, customMsg) {
      this.status = status;
      this.start = start;
      this.var1 = var1;
      this.var2 = var2;
      this.end = end;
      this.customMsg = customMsg;
}

Array.prototype.checkCombination = function() {

  if ( combination.has('melon') && combination.arr.length > 1 ) {
    return new infoMsg(false, null, 'melon', null, 'should not be consumed with any other foods.');
  }

  if ( combination.has('fat') && combination.has('fruits') ) {
    return new infoMsg(false, null, 'fat', 'fruits', 'should not be consumed together.');
  }

  if ( combination.has('acid') && combination.has('sweet') ) {
    return new infoMsg(false, null, 'acid', 'sweet', 'should not be consumed together.')
  }
  if ( combination.has('fruits') && combination.has('veggie') ) {
    return new infoMsg('not-rc', 'It is not recommended to consume ', 'fruits', 'veggie', 'together - eat with caution.');
  }
  // add diffrent response - it's not bad, but not recommended (fair?)
  if ( combination.has('fruits') && combination.has('starchy') ) {
    return new infoMsg(false, null, 'fruits', 'starchy', 'should not be consumed together.');
  }

  if ( combination.has('cruci') && combination.has('fruits') ) {
    return new infoMsg(false, null, 'cruci', 'fruits', 'should not be consumed together.');
  }

  if ( combination.has('cruci') ) {
    return new infoMsg('not-rc', null, null, null, null, 'Cruciferous vegetables can be hard to digest - eat with caution.')
  }

  return true;
};


var combination = (function() {

  var arr = [], info, status, msg;

  // checks if the fruit type is equal to the type passed as 'this'
  function filterType(fruit) {
      if (fruit.type == this) return true;
  }

  // TODO: Refactor to Array.prototype
  // returns new array which contains only fruits
  function onlyFruits() {
    return arr.filter( function(frt) {
      return ['sweet', 'sub-acid', 'acid'].indexOf(frt.type) > -1;
    });
  }

  // Returns new array contains only the specified type of fruits
  function filterFruits(type) {
    if (type == 'fruits') return onlyFruits();
    return arr.filter(filterType, type);
  }

  // check if array contains the specific type
  function containsType(type) {
    if ( type == 'fruits' ) {
      return filterFruits('sweet').length > 0 ||
             filterFruits('sub-acid').length > 0 ||
             filterFruits('acid').length > 0;
    }
    return this.arr.filter(filterType, type).length > 0;
  }

  // TODO: Refactor!
  function generateMessage(info) {
    msg = "";

    if ( info.customMsg ) {
      msg = info.customMsg;
    }

    else {

      if ( info.start ) {
        msg += info.start;
      }

      if ( info.var1 ) {
        msg += info.var1.addPlural();

        msg += ' (';

        filterFruits(info.var1).forEach(function( frt, index, arr ) {
            msg += frt.name.capitalize();
            if ( arr.length - 1 != index ) msg += ', ';
        });

        msg += ')';
      }

      if ( info.var2 ) {
        msg += ' and ' + info.var2.addPlural();

        msg += ' (';

        filterFruits(info.var2).forEach(function( frt, index, arr ) {
            msg += frt.name.capitalize();
            if ( arr.length - 1 != index ) msg += ', ';
        });

        msg += ')'
      }

      if ( info.end ) {
        msg += ' ' + info.end;
      }
    }
    return msg;
  }

  var publicAPI = {
    arr: arr,
    get status() {
      info = this.arr.checkCombination();
      // If status is true, there's no need in generating info message
      if ( info === true ) {
        return true;
      } else {
        msg = generateMessage(info);
        view.message.textContent = msg.swapWords().capitalize();
        return info.status; // false / 'not-rc'
      }
    },
    has: containsType,

  }

  return publicAPI;
})();
