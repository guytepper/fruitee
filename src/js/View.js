import Fruit from './Fruit';
import FruitsList from './FruitsList';
import Combination from './Combination';

export default class View {
	
	constructor() {
		this.fruitsList = new FruitsList();
		this.fruits = document.getElementsByClassName('frt-item');
		this.fruitsDiv = document.getElementById('fruits');
		this.selectedFruits = document.getElementById('selected-fruits');
		this.containers = { fruitsDiv: this.fruitsDiv, selectedFruits: this.selectedFruits };
	}

	addToFruitsList(fruit) {
		console.log(fruit);
		this.fruitsList.push(fruit);
		console.log(this.fruitsList);
	}

	attachViewEvents() {
		Array.prototype.forEach.call(this.fruits, fruit => {
			let fruitObj = new Fruit(fruit.id, fruit.getAttribute('data-fruit-type'));
			fruit.addEventListener('click', () => {
				this.addToFruitsList(fruitObj)
			});
		});
	}

	init() {
		this.attachViewEvents();
	}
}