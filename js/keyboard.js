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

  getByOrder: function(direction) {
    var fruits = view.fruitsDiv.children,
        currentOrder = this.getOrder(),
        closestNum = direction == 'next' ? fruits.length : 0,
        findClosest, order, elm;

    findClosest = (function(direction) { 
      function bigger() {
        if ( order > currentOrder && order < closestNum) {
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


  getPreviousByOrder: function() {
    var fruits = view.fruitsDiv.children,
        currentOrder = this.getOrder(),
        closestNum = 0,
        order, elm;

    for ( var i = 0 ; i < fruits.length ; i++ ) {

      order = parseInt(window.getComputedStyle(fruits[i]).getPropertyValue('order'));
      
      if ( order < currentOrder && order > closestNum) {
        closestNum = order;
        elm = fruits[i];
      }

    }

    return elm;
  },

  // targetDiv - the opposite of the current div (this)
  selectItem: function() {

    var parent = this.elm.parentElement;
        targetDiv = parent == view.fruitsDiv ? view.selectedFruits : view.fruitsDiv;    

    this.setTabIndex('next');
    this.elm.setAttribute('tabindex', 0); // stupid!
    this.resetTabIndex(targetDiv);

  },

  click: function() {
    var event = new MouseEvent('click');
    this.elm.dispatchEvent(event);
  },

  setTabIndex: function(direction) {

    this.elm.setAttribute('tabindex', -1);

    if ( direction == 'next' )
      this.nextElement.setAttribute('tabindex', 0);
    else 
      this.prevElement.setAttribute('tabindex', 0);
  },

  resetTabIndex: function(div) {
    if ( div.children != null ) {
      Array.prototype.forEach.call(div.children, function(elm) { 
        elm.setAttribute('tabindex', '-1'); 
      });
    }
  }

};

function keyNavigation() {
  var key = event.which,
      self = focusController,
      tempElm;

  switch ( key ) {
    case 37:
      self.setTabIndex('prev');
      self.prevElement.focus();
      break;      
    
    case 39:
      self.setTabIndex('next');
      self.nextElement.focus();
      break;

    case 13:
      tempElm = self.nextElement;
      self.selectItem();
      self.click();
      tempElm.focus();
      break;
  }

}

view.fruitsDiv.addEventListener('keydown', keyNavigation);
view.selectedFruits.addEventListener('keydown', keyNavigation);