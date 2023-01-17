/**
Tic Tac Toe
Author: Kamyar Karimi

This project uses p5.js to replicate Tic Tac Toe.
*/

"use strict";

let grids = [];

let currentPlayer = 0;
let winner = "";

let player1Count = parseInt(localStorage.getItem("player1Count")) || 0;
let player2Count = parseInt(localStorage.getItem("player2Count")) || 0;

console.log(player1Count);

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
	createCanvas(500, 500);
	background("black");
	drawBoard();
}

/**
 Description of draw()
 */
function draw() {
	background("black");
	// ruler();

	drawTurn();

	grids.forEach((grid) => {
		grid.display();
	});
}

function CheckerGrid(x, y) {
	this.x = x;
	this.y = y;
	this.col = color(255, 100);
	this.middle = (x * 2 + y * 2) / 2;
	this.shouldSign = false;
	this.sign = null;
	this.index = grids.length;

	print(`Middle is: ${this.middle} and x ${this.x} and y ${this.y}
			and index ${this.index}`);
	this.display = function () {
		fill(this.col);
		square(x, y, 55);

		if (this.shouldSign) {
			fill("white");
			text(this.sign, this.x + 25, this.y + 27.5);
		}
	};

	this.clicked = function (sign) {
		var d = dist(mouseX, mouseY, this.x, this.y);
		if (d < 30 && !this.shouldSign) {
			this.col = color(255, 0, 200);
			this.shouldSign = true;

			this.sign = sign;

			if (currentPlayer == 0) {
				currentPlayer = 1;
			} else if (currentPlayer == 1) {
				currentPlayer = 0;
			}

			evaluateBoard();
		}
	};
}

function drawBoard() {
	var xInit = 70;
	var yInit = 100;

	for (var y = 0; y < 3; y++) {
		for (var x = 0; x < 3; x++) {
			var newSquare = new CheckerGrid(xInit * x + 150, yInit + 50);
			grids.push(newSquare);
		}
		yInit += 70;
	}
}

function mousePressed() {
	for (var i = 0; i < grids.length; i++) {
		if (currentPlayer === 0) {
			grids[i].clicked("x");
		} else if (currentPlayer === 1) {
			grids[i].clicked("o");
		}
	}
}

function evaluateBoard() {
	var signs = [];
	var calculateFinal = false;
	for (var i = 0; i < grids.length; i++) {
		signs.push(grids[i].sign);
	}
	print(signs);

	for (var i = 0; i < signs.length; i++) {
		if (evaluateFunction(signs[0], signs[1], signs[2])) {
			print("top row won");
			decideWinner(signs[0]);
			return;
		} else if (evaluateFunction(signs[3], signs[4], signs[5])) {
			print("middle row won");
			decideWinner(signs[3]);
			return;
		} else if (evaluateFunction(signs[6], signs[7], signs[8])) {
			print("bottom row won");
			decideWinner(signs[6]);
			return;
		} else if (evaluateFunction(signs[0], signs[3], signs[6])) {
			print("left col won");
			decideWinner(signs[0]);
			return;
		} else if (evaluateFunction(signs[1], signs[4], signs[7])) {
			print("vertical mid col won");
			decideWinner(signs[1]);
			return;
		} else if (evaluateFunction(signs[2], signs[5], signs[8])) {
			print("right col won");
			decideWinner(signs[2]);
			return;
		} else if (evaluateFunction(signs[0], signs[4], signs[8])) {
			print("left diagonal won");
			decideWinner(signs[0]);
			return;
		} else if (evaluateFunction(signs[2], signs[4], signs[6])) {
			print("right diagonal won");
			decideWinner(signs[2]);
			return;
		} else {
			print("nobody won");
		}
	}

	signs.forEach((sign) => {
		if (sign == null) {
			calculateFinal = false;
		} else {
			calculateFinal = true;
		}
	});

	if (calculateFinal) {
		print("game done");
		decideWinner("none");
	}
}

function evaluateFunction(a, b, c) {
	if (a == null || b == null || c == null) {
		return false;
	} else if (a === b && b === c) {
		return true;
	}
}

function decideWinner(sign) {
	if (sign === "none") {
		print("nobody won");
		winner = "nobody won";
	} else if (sign === "x") {
		winner = "Player 1 won the game";

		localStorage.setItem("player1Count", (player1Count += 1));
	} else if (sign === "o") {
		winner = "Player 2 won the game";

		localStorage.setItem("player2Count", (player2Count += 1));
	}
}

function drawTurn() {
	if (winner != "") {
		fill("red");
		text(winner, 190, 120);
		return;
	}
	if (currentPlayer == 0) {
		fill("white");
		text("Player 1 make a move", 190, 120);
	} else if (currentPlayer == 1) {
		fill("white");
		text("Player 2 make a move", 190, 120);
	}

	text(`Player 1 stats: ${player1Count}`, 50, 50);
	text(`Player 2 stats: ${player2Count}`, 50, 70);
}

function resetStats() {
	localStorage.clear();
	window.location.reload();
}

function newRound() {
	window.location.reload();
}

/** PROD TOOLS */

/*
 * have a clearer idea of the points on the canvas
 * only used for production, won't be used for the final result
 */
function ruler() {
	for (let i = 1; i < 1080; i++) {
		/* to have a clean look, as without this constraint
		 * all points would be written on the screen.
		 */
		if (i % 50 === 0) {
			fill("white");
			text(i, i, 20);
			text(i, 5, i);
		}
	}
}
