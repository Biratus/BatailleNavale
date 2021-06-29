var GAME = { nbCase: 10, caseSize: 50 };

let placingBoats = false;

// size of boat : number of boat
let capacityRule = {
	4: 1,
	3: 2,
	2: 2,
	1: 3
}

let boats = [];
let startDrag, currDrag;

function setup() {
	createCanvas(GAME.nbCase * GAME.caseSize, GAME.nbCase * GAME.caseSize);
	background(200);

	drawGrid();

	let infos = document.createElement('p');
	infos.setAttribute('id', 'informations');
	document.body.insertBefore(infos, document.getElementsByTagName('main')[0]);
	infos.style.display = 'block';
	infos.style.width = '100%';
	infos.style.height = '10vw';
	infos.style.padding = '0.2em';

	feedback.showWithClick('Bonjour..', 'Place les bateaux \navec la souris');
	feedback.whenEnd(whenStart);
}

function draw() {

	clear();

	background(200);

	drawGrid();

	for (let b of boats) {
		drawBoat(b);
	}

	if (placingBoats) {
		drawForPlacement();
	}

	feedback.render();

}

function drawForPlacement() {
	if (startDrag) {
		fill(31, 81, 9);
		rect(1 + startDrag.x * GAME.caseSize, 1 + startDrag.y * GAME.caseSize, GAME.caseSize - 2, GAME.caseSize - 2);
	}
	if (currDrag) {
		fill(101, 185, 65);
		if (startDrag.x == currDrag.x) {//vertical
			if (startDrag.y < currDrag.y) { // top to bot
				for (let i = startDrag.y; i <= currDrag.y; i++) {
					rect(startDrag.x * GAME.caseSize, i * GAME.caseSize, GAME.caseSize, GAME.caseSize);
				}
			} else {
				for (let i = startDrag.y; i >= currDrag.y; i--) {
					rect(startDrag.x * GAME.caseSize, i * GAME.caseSize, GAME.caseSize, GAME.caseSize);
				}
			}
		} else {
			if (startDrag.x < currDrag.x) { // left to right
				for (let i = startDrag.x; i <= currDrag.x; i++) {
					rect(i * GAME.caseSize, startDrag.y * GAME.caseSize, GAME.caseSize, GAME.caseSize);
				}
			} else {
				for (let i = startDrag.x; i >= currDrag.x; i--) {
					rect(i * GAME.caseSize, startDrag.y * GAME.caseSize, GAME.caseSize, GAME.caseSize);
				}
			}
		}
	}

}

function addBoat(boat) {
	if (!validBoat(boat) || !respectCapacity(boat)) return false;

	boats.push(boat);
	return true;
}

function respectCapacity(boat) {
	return boats.filter(b => b.size == boat.size).length < capacityRule[boat.size];
}

function mousePressed() {
	startDrag = mouseToGrid(mouseX, mouseY);
}

function mouseDragged() {
	let drag = mouseToGrid(mouseX, mouseY);
	if (drag.x != startDrag.x && drag.y != startDrag.y) return;
	currDrag = drag;
}

function mouseReleased() {
	if (feedback.next()) return;

	if (!placingBoats) return;
	else if (!currDrag) {
		startDrag = null;
		return;
	}
	let boat;
	if (startDrag.x == currDrag.x) {//vertical
		if (startDrag.y < currDrag.y) { // top to bot
			boat = newBoat(startDrag.x, startDrag.y, currDrag.y - startDrag.y + 1, true);
		} else {
			boat = newBoat(currDrag.x, currDrag.y, startDrag.y - currDrag.y + 1, true);
		}
	} else {
		if (startDrag.x < currDrag.x) { // left to right
			boat = newBoat(startDrag.x, startDrag.y, currDrag.x - startDrag.x + 1, false);
		} else {
			boat = newBoat(currDrag.x, currDrag.y, startDrag.x - currDrag.x + 1, false);
		}
	}
	startDrag = null;
	currDrag = null;
	if (addBoat(boat)) {
		showCapacity();
		//new
		if (checkCapacityReached) {
			placingBoats = false;
			feedback.hideConstant();
		}
	}

}

function checkCapacityReached() {
	let boatsBySize = {};
	for (let size in capacityRule) {
		boatsBySize[size] = 0;
	}

	for (let boat of boats) {
		boatsBySize[boat.size]++;
	}

	for (let size in capacityRule) {
		// on a pas encore atteint la limite
		if (boatsBySize[size] < capacityRule[size]) return false;
	}

	return true;

}

function mouseToGrid(x, y) {
	return {
		x: floor(x / GAME.caseSize),
		y: floor(y / GAME.caseSize)
	}
}

function whenStart() {
	placingBoats = true;
	showCapacity();
}

function showCapacity() {
	let capacityStr = '';
	for (let c in capacityRule) {
		capacityStr += c + ' cases: ' + boats.filter(b => b.size == c).reduce((a) => a += 1, 0) + '/' + capacityRule[c] + '\n';
	}
	feedback.showConstant(capacityStr, { x: 50, y: 20 }, 14);
}

function showInfos(text) {
	document.getElementById('informations').textContent = text;
}
