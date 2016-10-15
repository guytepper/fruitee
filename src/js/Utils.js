// Sends click event with the fruit name to GA
export const sendAnalyticsEvent = function sendAnalyticsEvent(frtName) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Fruit',
    eventAction: 'click',
    eventLabel: frtName
  });
};

// Reset the tabindex for the container child elements
export const resetTabIndex = function resetTabIndex(elm) {
  Array.prototype.forEach.call(elm.children, child => {
    // Skip if the element should no be focusable
    if (child.dataset.noFocus == 'true') return;
    child.tabIndex = '-1';
  });
};
