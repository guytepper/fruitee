var view = (function() {
  var fruits = document.getElementsByClassName('frt-item'),
      statusElm = document.getElementById('status'),
      combinationElm = document.getElementById('combination'),
      selectedFruits = document.getElementById('selected-fruits'),
      fruitsDiv = document.getElementById('fruits'),
      containers = { fruitsDiv: fruitsDiv, selectedFruits: selectedFruits },
      info = document.getElementById('info'),
      message = document.getElementById('message'),
      msgDisplayed = false;

  function updateStatusText() {
    if ( combination.arr.length == 0 ) {
      selectedFruits.innerHTML = '<h2>pick up some fruits!</h2>';
      statusElm.textContent = 'No fruit selected.'; // for screen readers
      combinationElm.style.visibility = 'hidden';
    }

    else {
      var status = combination.status;
      combinationElm.style.visibility = 'visible';
      switch ( status ) {
        case true:
          statusElm.textContent = 'Great!';
          info.style.display = 'none';
          break;
        case false:
          statusElm.textContent = 'Bad';
          info.style.display = 'block';
          break;
        case 'not-rc':
          statusElm.textContent = 'Fair';
          info.style.display = 'block';
          break;
        default:
          console.log('Combination Error.');
      }

      statusElm.className = status;
    }
  }

  // Move fruit from it's current container to the destination
  function moveFruit(fruit, dest) {
    containers[dest].appendChild(fruit);
  }

  var publicAPI = {
    fruits: fruits,
    selectedFruits: selectedFruits,
    fruitsDiv: fruitsDiv,
    message: message,
    updateStatusText: updateStatusText,
    moveFruit: moveFruit,
  };

  return publicAPI;

})();
