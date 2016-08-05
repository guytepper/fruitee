// Handles keyboard navigation through the app
// TODO: Refactor

var focusController = {

  get elm() {
    return document.activeElement;
  },

  get nextElement() {
    return this.getByOrder('next');
  },

  get prevElement() {
    return this.getByOrder('prev');
  },

  getOrder: function() {
    var props = window.getComputedStyle(this.elm);
    return parseInt(props.getPropertyValue('order'));
  },

  getHighestOrder: function() {
    var items = this.elm.parentElement.children;
    var orderArr = Array.prototype.map.call(items, function(elm) {
      return parseInt(window.getComputedStyle(elm).getPropertyValue('order'));
    });
    return Math.max.apply(null, orderArr);
  },

  getByOrder: function(direction) {
    var fruits = this.elm.parentElement.children,
        currentOrder = this.getOrder(),
        closestNum = direction == 'next' ? this.getHighestOrder() : 0,
        order, elm;

    var findClosest = (function(direction) {
      function bigger() {
        if ( order > currentOrder && order <= closestNum) {
          closestNum = order;
          elm = fruits[i];
        }
      }

      function smaller() {
        if ( order < currentOrder && order > closestNum) {
          closestNum = order;
          elm = fruits[i];
        }
      }

      return direction == 'next' ? bigger : smaller;
    })(direction);

    for ( var i = 0 ; i < fruits.length ; i++ ) {

      order = parseInt(window.getComputedStyle(fruits[i]).getPropertyValue('order'));

      findClosest();

    }

    return elm;
  },

  // targetDiv - the opposite of the current div (this)
  selectItem: function() {
    if ( this.elm ) {
      var parent = this.elm.parentElement;
          targetDiv = parent == view.fruitsDiv ? view.selectedFruits : view.fruitsDiv;
          tempElm = this.nextElement || this.prevElement;


      // this.focusItem('next');
      this.elm.setAttribute('tabindex', 0); // stupid!
      this.resetTabIndex(targetDiv);

      if ( tempElm ) {
        tempElm.setAttribute('tabindex', 0);
        tempElm.focus();
      }
    }

  },

  click: function() {
    var event = new MouseEvent('click');
    this.elm.dispatchEvent(event);
  },

  focusItem: function(direction) {


    if ( direction == 'next' ) {
      var nextElement = this.nextElement;
      if ( nextElement ) {
        this.elm.setAttribute('tabindex', -1);
        nextElement.setAttribute('tabindex', 0);
        nextElement.focus();
      }
    }
    else {
      var prevElement = this.prevElement;
      if ( prevElement ) {
        this.elm.setAttribute('tabindex', -1);
        prevElement.setAttribute('tabindex', 0);
        prevElement.focus();
      }
    }
  },

  resetTabIndex: function(div) {
    if ( div.children != null ) {
      Array.prototype.forEach.call(div.children, function(elm) {
        elm.setAttribute('tabindex', '-1');
      });
    }
  }

};

function keyNavigation(event) {
  var key = event.which,
      self = focusController,
      tempElm;

  switch ( key ) {
    case 37:
      self.focusItem('prev');
      break;

    case 39:
      self.focusItem('next');
      break;

    case 13:
      self.click();
      break;

    // i -> display information
    case 73:
        if ( view.msgDisplayed ) {
          view.msgDisplayed = false;
          view.message.style.opacity = '0';
        }
        else {
          view.msgDisplayed = true;
          view.message.style.opacity = '1';
        }
        break;
  }
}

document.addEventListener('keydown', keyNavigation);

// outline.js
(function(d){

  var style_element = d.createElement('STYLE'),
      add_event_listener = function(type, callback){
        d.addEventListener(type, callback);
      },
      set_css = function(css_text){
        style_element.innerHTML = css_text;
      }
  ;

  d.getElementsByTagName('HEAD')[0].appendChild(style_element);

  // Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
  add_event_listener('mousedown', function(){
    set_css('.frt-item:focus{outline:0};');
  });

  add_event_listener('keydown', function(){
    set_css('.frt-item:focus {outline-width: 0;box-shadow: 0 0 3pt 2pt #7193AB;}');
  });

})(document);
