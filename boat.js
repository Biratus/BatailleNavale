



function validBoat(boat) {
	let {size,vertical} = boat;
	let {x,y} = boat.pos;
	if(x<0 || y<0) return false;
	else if(vertical && y+size>GAME.nbCase || !vertical && x+size>GAME.nbCase) return false;
	else if(overlapBoat(boat)) return false;
	return true;
}

function overlapBoat(boat) {
	for(let b of boats) {
		for(let cell of boat.cells) {
			if(b.cells.indexOf(cell)>=0) return true;
		}
	}
	return false;
}



// vertical = true or false
function newBoat(x,y,size,vertical) {
	let b = {
		pos:{x,y},size,vertical
	};

	// On construit une liste des différentes cases du bateaux
	let i = 0;
	let cells = [];
	while(i<b.size) {
		cells.push({x,y});
		if(b.vertical) y++;
		else x++;
		i++;
	}
	b.cells = cells
	return b;
}


function drawBoat(boat) {
	noStroke();
	fill(31,31,31);
	for(let cell of boat.cells) {
		rect(cell.x*GAME.caseSize,cell.y*GAME.caseSize,GAME.caseSize,GAME.caseSize);
	}
}
