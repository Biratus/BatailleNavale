
let {nbCase,caseSize} = GAME;
let maxLength = nbCase*caseSize;

function drawGrid() {
	noFill();
	stroke(0);
	for(let x = 0; x <= maxLength; x+=caseSize) {
		line(x,0,x,maxLength);
		line(0,x,maxLength,x);
	}
}