window.addEventListener('keydown', function() { 
  switch(event.which) {
    case 37:
      console.log('Left Key Pressed');
      break;      
    case 38: 
      console.log('Up Key Pressed');
      break;
    case 39: 
      console.log('Right Key Pressed');
      break;
    case 40:
      console.log('Down Key Pressed');
      break;
  }
});