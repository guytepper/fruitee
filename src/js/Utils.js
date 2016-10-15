// Sends click event with the fruit name to GA
export const sendAnalyticsEvent = function sendAnalyticsEvent(frtName) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Fruit',
    eventAction: 'click',
    eventLabel: frtName
  });
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

/* The function gets the current element ID and Keyborder instance, and uses
 * them to get the next element - which is being focused instead of the current
 * element that is moved away from it's container.
 */
export const focusNextElement = function focusNextElement(id, keyborder) {
  const currentElm = document.getElementById(id);
  const nextElm = keyborder.getClosestElement(currentElm, 'next');
  nextElm.tabIndex = '0';
  nextElm.focus();
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
    styleElm.innerHTML = '.frt-item:focus { outline: 0 }';
  });
  document.addEventListener('keydown', function() {
    // Adding focus ring when using keyboard
    styleElm.innerHTML = '.frt-item:focus { outline-width: 0; box-shadow: 0 0 3pt 2pt #7193AB; }';
  });
};
