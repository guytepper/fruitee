function focusController(currentElm) {
  this.currentElm = currentElm;
}

focusController.prototype.nextItem = function() {
  return this.currentElm.nextElementSibling;  
};

focusController.prototype.previousItem = function() {
  return this.currentElm.previousElementSibling;
};

focusController.prototype.selectItem = function() {
  var event = new MouseEvent('click');
  this.currentElm.dispatchEvent(event);
};

function keyAccessibility() {
  var key = event.which;
  if ( key == 37 || key == 39 ||key == 13 ) {
    
    var currentElm = document.activeElement,
        self = new focusController(currentElm),
        nextItem = self.nextItem(),
        prevItem = self.previousItem();
    // console.log(prevItem);

    switch(key) {
      case 37:
        if ( prevItem ) {
          currentElm.setAttribute('tabindex', -1);
          prevItem.setAttribute('tabindex', 0);
          prevItem.focus();
        }
        break;
      case 39: 
        if ( nextItem ) {
          currentElm.setAttribute('tabindex', -1);
          nextItem.setAttribute('tabindex', 0);
          nextItem.focus();
        }
        break;
      case 13:
        self.nextItem().setAttribute('tabindex', 0);
        self.nextItem().focus();
        self.selectItem();
    }
  }
}

view.fruitsDiv.addEventListener('keydown', keyAccessibility);
view.selectedFruits.addEventListener('keydown', keyAccessibility);
