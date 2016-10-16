// Sends click event with the fruit name to GA
export const sendAnalyticsEvent = function sendAnalyticsEvent(frtName) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Fruit',
    eventAction: 'click',
    eventLabel: frtName
  });
};

// TODO: Load polyfills asynchonously
export const loadPolyfills = function loadPolyfills() {
  // Array.includes polyfill
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.includes called on null or undefined');
      }

      var O = Object(this);
      var len = parseInt(O.length, 10) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1], 10) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {k = 0;}
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement ||
           (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
          return true;
        }
        k++;
      }
      return false;
    };
  }
};

/****************************/
/**** Keyboard Navigation ***/
/****************************/

// Reset the tabindex for the container child elements
export const resetTabIndex = function resetTabIndex(elm) {
  Array.prototype.forEach.call(elm.children, child => {
    // Skip if the element should no be focusable
    if (child.dataset.noFocus == 'true') return;
    child.tabIndex = '-1';
  });
};

/* The function gets the current element ID & Keyborder instance, and uses
 * them to get the next / previous element - which is being focused instead of the
 * current element that is moved away from it's container.
 */
export const focusNextElement = function focusNextElement(id, keyborder) {
  const currentElm = document.getElementById(id);
  // Check if there's an element exists after / before the current element.
  const nextElm = keyborder.getClosestElement(currentElm, 'next')
                  || keyborder.getClosestElement(currentElm, 'previous');

  if (nextElm) {
    nextElm.tabIndex = '0';
    nextElm.focus();
  }
};

/* Attach listeners to append modify the .frt-item elements so when using keyboard
 * navigation the focus ring would be styled correctly.
 * Not using a class name since it will be reappended on each keydown event.
 */
export const attachListeners = function attachListeners() {
  const styleElm = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleElm);

  document.addEventListener('mousedown', function() {
    // Removing focus ring when using a mouse
    styleElm.innerHTML = '.frt-item:focus { outline: none; }';
  });
  document.addEventListener('keydown', function() {
    // Adding focus ring when using keyboard
    styleElm.innerHTML = '.frt-item:focus { outline: none; box-shadow: 0 0 3pt 2pt #7193AB; }';
  });
};
