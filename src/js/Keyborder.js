var Keyborder = function(selectors) {
  this.elements = document.querySelectorAll(selectors);
  Array.prototype.forEach.call(this.elements, elm => {
    this.setTabIndex(elm);
    elm.addEventListener('keydown', e => this.keyNavigation(e)); // ehm y return
  });
}

// Returns the CSS order property for the element
Keyborder.prototype.getOrderProp = function(elm) {
  // Property is provided as a string, so we return it as an interger instead
  return parseInt(window.getComputedStyle(elm).getPropertyValue('order'));
};

// Returns the lowest order prop for the elements
 Keyborder.prototype.getLowestOrder = function(children) {
  // Use array's map method to iterate through the children NodeList
  orderArr = Array.prototype.map.call(children, elm => {
    return this.getOrderProp(elm);
  });

  return Math.min.apply(null, orderArr);
 };

// Sets the tabindex attribute to for the childrens, according to thier order property
Keyborder.prototype.setTabIndex = function(elm) {
  const children = elm.children;
  const lowestOrder = this.getLowestOrder(children);

  Array.prototype.forEach.call(children, elm => {
    // Dont set tabindex if 
    if (elm.dataset.noFocus == 'true') return;

    if (this.getOrderProp(elm) == lowestOrder) elm.tabIndex = '0';
    else elm.tabIndex = '-1';
  });
};

// Get the loweset / highest order value from the supplied node list
Keyborder.prototype.getMinMaxOrderProp = function(nodeList, minmax) {
  if (minmax != 'min' && minmax != 'max') {
    throw new Error('Wrong argument provided - accepted values are only min / max.');
  }

  // Create array contains each element's order value 
  const orderArr = Array.prototype.map.call(nodeList, elm => {
    return this.getOrderProp(elm);
  });  
  
  switch (minmax) {
    case 'min':
      return Math.min.apply(null, orderArr);
    case 'max':
      return Math.max.apply(null, orderArr);
  }
}

// Returns the closest previous / next element by the order property
Keyborder.prototype.getClosestElement = function(currentElement, direction) {
  if (direction != 'previous' && direction != 'next') {
    throw new Error('Wrong argument provided - accepted values are only previous / next.');
  }

  const siblings = currentElement.parentNode.children;
  const currentOrder = this.getOrderProp(currentElement);
  // Sets the intial closest element to the element itself, in case there's no element after / before
  let closestElm = currentElement;

  if (direction == 'previous') {
    // Setting the initial closest order value to the lowest possibility
    let closestOrder = this.getMinMaxOrderProp(siblings, 'min');
    Array.prototype.forEach.call(siblings, elm => {
      const elmOrder = this.getOrderProp(elm);
      if (elmOrder < currentOrder && elmOrder >= closestOrder) {
        closestOrder = elmOrder;
        closestElm = elm;
      }
    });
  }

  if (direction == 'next') {
    // Setting the initial closest order value to the highest possibility
    let closestOrder = this.getMinMaxOrderProp(siblings, 'max');
    Array.prototype.forEach.call(siblings, elm => {
      const elmOrder = this.getOrderProp(elm);
      if (elmOrder > currentOrder && elmOrder <= closestOrder) {
        closestOrder = elmOrder;
        closestElm = elm;
      }
    });
  }
  
  return closestElm;
}

/* Handles key navigation when focused inside the container.
 * - The previous / next element are being focused using the element's
 *   order property.
 * - The tabindex property is modified so the next time the element's parent
 *   node get focused.
*/
Keyborder.prototype.keyNavigation = function(event) {
  const key = event.which;
  const activeElm = document.activeElement;
  let closestElm = null;

  switch (key) {
    case 39:
      closestElm = this.getClosestElement(activeElm, 'next');
      break;
    case 37:
      closestElm = this.getClosestElement(activeElm, 'previous');
      break;
  }

  if (closestElm != activeElm && closestElm != null) {
    activeElm.tabIndex = '-1';
    closestElm.focus();
    closestElm.tabIndex = '0';
  }
}

export default Keyborder;