import { vm } from './View';

class App {
  static init() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('ServiceWorker registered.');
      });
    }
  }
}

App.init();
