// Sends click event with the fruit name to GA 
export const sendAnalyticsEvent = function sendAnalyticsEvent(frtName) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Fruit',
    eventAction: 'click',
    eventLabel: frtName
  });
};
