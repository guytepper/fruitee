view = require('./view');
console.log(view.fruits);

view.fruits.forEach(function() {
  var fruit = {
    name : fruits[i].id,
    type : fruits[i].dataset.fruitType
  };
  this.addEventListener('click', currentFruits(this, fruit));
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
      combinatoin.arr.drop(fruit);
      view.moveFruit(div, 'fruitsDiv');
    }
  };    
};

