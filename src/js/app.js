var app = (function() {

  function initFruitEvents() {

    var isTouch = utils.isTouch,
        eventName = isTouch ? 'touchend' : 'click', // TODO: Check FastClick implmentation
        fingerMove = false;

    function sendAnalyticsEvent(frtName) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Fruit',
        eventAction: 'click',
        eventLabel: frtName
      });
    }

    // Fruit click event handler
    function currentFruits (div, fruit) {
      // TODO: Refactor
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

    // Attach event listeners to fruits
    Array.prototype.forEach.call(view.fruits, function(fruitDiv) {
      var fruit = {
        name : fruitDiv.id,
        type : fruitDiv.getAttribute('data-fruit-type')
      };

      fruitDiv.addEventListener(eventName, currentFruits(fruitDiv, fruit));
    });

    // Touch-related events
    (function initTouchEvents() {
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
      else { // sets hover on .frt-item - no hover on touch devices
        view.fruitsDiv.className = "hover";
        view.selectedFruits.className = "hover";
      }
    })();

  }

  function init() {
    initFruitEvents();
    // Origami.fastclick(document.body);
  }

  var publicAPI = {
    init: init,
  }

  return publicAPI;

})();

app.init();
