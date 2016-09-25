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

	// Moves the fruit to the desired target
	moveFruit(fruitElm, targetElm) {
 		targetElm.appendChild(fruitElm);
	}

	// Add or remove fruits from list
	manipulateFruitsList(fruit, node) {
		if ( this.fruitsList.includes(fruit) ) {
			this.fruitsList.remove(fruit);
			this.moveFruit(node, this.containers['fruitsDiv']);
		}
		else {
			this.fruitsList.push(fruit);
			this.moveFruit(node, this.containers['selectedFruits']);
		}	
	}

	attachViewEvents() {
		Array.prototype.forEach.call(this.fruits, node => {
			let fruitObj = new Fruit(node.id, node.getAttribute('data-fruit-type'));
			node.addEventListener('click', () => {
				this.manipulateFruitsList(fruitObj, node);
			});
		});
	}

	init() {
		this.attachViewEvents();
	}
}