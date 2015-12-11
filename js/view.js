// var view = {
//   fruits: document.getElementsByClassName('frt-item'),
//   statusElm: document.getElementById('status'),
//   selectedFruits: document.getElementById('selected-fruits'),
//   fruitsDiv: document.getElementById('fruits'),
  
//   updateStatusText: function() {
//     var status = combination.status;
//     if (status == true) this.statusElm.textContent = 'Great!';
//     else this.statusElm.textContent = 'Bad';
//     this.statusElm.className = status;
//   },

//   moveFruit: function(fruit, dest) {
//     this[dest].appendChild(fruit);
//   }
// };

var fruits = document.getElementsByClassName('frt-item');
var statusElm = document.getElementById('status');
var selectedFruits = document.getElementById('selected-fruits');
var fruitsDiv = document.getElementById('fruits');

exports.fruits = (function() {
  return fruits;
})();
exports.updateStatusText = function() {
  var status = combination.status;
  if (status == true) this.statusElm.textContent = 'Great!';
  else this.statusElm.textContent = 'Bad';
  this.statusElm.className = status;
}

exports.moveFruit = function(fruit, dest) {
  this[dest].appendChild(fruit);
}