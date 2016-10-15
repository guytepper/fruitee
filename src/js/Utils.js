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
2
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
