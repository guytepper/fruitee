import View from './View';

class App {
	static init() {		
		this.view = new View();
		this.view.init();
	}
}

App.init();