/**
Tic Tac Toe
Author: Kamyar Karimi

This project uses p5.js to replicate Tic Tac Toe.
*/

"use strict";

/** VARIABLES */

// stores grids
let grids = [];

// to hold the state of the players
let currentPlayer = 0;
let winner = "";

// for the general stats, if localstorage is null, proceeds to 0
let player1Count = parseInt(localStorage.getItem("player1Count")) || 0;
let player2Count = parseInt(localStorage.getItem("player2Count")) || 0;

/** p5.js SETUP functions **/

/**
Description of setup
*/
function setup() {
	createCanvas(500, 500);
	background("black");
	// initial drawing of the board
	drawBoard();
}

/**
 Description of draw()
 */
function draw() {
	background("black");

	// draws The turn instructions
	drawTurn();
	drawStats();

	// calls for display method
	grids.forEach((grid) => {
		grid.display();
	});
}

/** BOARD FUNCTIONS */

// checker grid class for each square
function CheckerGrid(x, y) {
	this.x = x;
	this.y = y;
	this.col = color(255, 100);
	this.middle = (x * 2 + y * 2) / 2; // to find the middle point of the square
	this.shouldSign = false; // conditional to control each sign
	this.sign = null;

	print(`Middle is: ${this.middle} and x ${this.x} and y ${this.y}
			and index ${this.index}`);

	// controler function that behaves as displayer when parameters of class prototype change
	this.display = function () {
		fill(this.col);
		square(x, y, 55);

		if (this.shouldSign) {
			fill("white");
			text(this.sign, this.x + 25, this.y + 27.5);
		}
	};

	// this function gets processed when a square is clicked
	this.clicked = function (sign) {
		var d = dist(mouseX, mouseY, this.x, this.y);

		// Conditional that controls the right square to get checked
		if (d < 30 && !this.shouldSign) {
			this.col = color(255, 0, 200);
			this.shouldSign = true;

			this.sign = sign;

			// controller for whenever a square is checked change the turn
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

/**
 *
 */
function mousePressed() {
	for (var i = 0; i < grids.length; i++) {
		if (currentPlayer === 0) {
			grids[i].clicked("x");
		} else if (currentPlayer === 1) {
			grids[i].clicked("o");
		}
	}
}

/**
 * Evaluaation function for end of the game
 * processes checker grids and decides accordingly
 */
function evaluateBoard() {
	var signs = [];
	var calculateFinal = false;

	for (var i = 0; i < grids.length; i++) {
		signs.push(grids[i].sign);
	}

	print(signs);

	// goes through the board (the arrays) and evaluates according to the rules
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
		}
	}

	// if there are unchecked grids on the board it stops it from evaluating an endgame result
	for (var i = 0; i < signs.length; i++) {
		if (signs[i] == null) {
			calculateFinal = false;
			break;
		} else {
			calculateFinal = true;
		}
	}

	if (calculateFinal) {
		print("game done");
		decideWinner("none");
	}
}

// takes three points of each grid according to check if a winner is decided or not
function evaluateFunction(a, b, c) {
	if (a == null || b == null || c == null) {
		return false;
	} else if (a === b && b === c) {
		return true;
	}
}

/**
 * End game text updates when a winner is decided
 */
function decideWinner(sign) {
	if (sign === "none") {
		winner = "nobody won";
	} else if (sign === "x") {
		winner = "Player 1 won the game";

		localStorage.setItem("player1Count", (player1Count += 1));
	} else if (sign === "o") {
		winner = "Player 2 won the game";

		localStorage.setItem("player2Count", (player2Count += 1));
	}
}

/**
 * Draws the turn instruction text
 */
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
}

/**
 * Draws the stats on board
 */
function drawStats() {
	fill("white");
	text(`Player 1 stats: ${player1Count}`, 50, 50);
	text(`Player 2 stats: ${player2Count}`, 50, 70);
}

/**
 * Clears local storage that holds stats
 */
function resetStats() {
	localStorage.clear();
	window.location.reload();
}

/**
 * If players wish to start a new round
 */
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
