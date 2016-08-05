// Helper Functions
var utils = (function utils() {

  /**** String-Related functions ****/

  // Capitalizes the string
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  // Changes the string to plural form
  String.prototype.addPlural = function addPlural() {
      var lastChar = this.charAt(this.length - 1);

      // Checks if the string is already in the plural form
      if ( lastChar != 's' && lastChar != 'y' ) {
        return this + 's';
      }

      return this;
  }

  // Unique words that needs to be changed
  String.prototype.swapWords = function swapWords() {
    if ( this.indexOf('crucis') > -1 )
      return this.replace(/cruci/, 'Cruciferous vegetables');
    if ( this.indexOf('starchy') > -1 )
      return this.replace(/starchy/, 'starchy foods');
    return this;
  }

  /**** Feature Detections ****/
  var isTouch = (function isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  })();

  var publicAPI = {
    isTouch: isTouch,
  }

  return publicAPI;

})();
