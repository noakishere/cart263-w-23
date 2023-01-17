/**
Tic Tac Toe
Author: Kamyar Karimi

This project uses p5.js to replicate Tic Tac Toe.
*/

"use strict";

let grids = [];

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
	ruler();

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
	this.sign = "";

	print(`Middle is: ${this.middle} and x ${this.x} and y ${this.y}`);
	this.display = function () {
		fill(this.col);
		square(x, y, 55);

		if (this.shouldSign) {
			fill("white");
			text(this.sign, this.x + 15, this.y + 27.5);
		}
	};

	this.clicked = function (sign) {
		var d = dist(mouseX, mouseY, this.x, this.y);
		// var d = mouseX - this.middle;
		if (d < 30 && !this.shouldSign) {
			print(`${d}`);
			this.col = color(255, 0, 200);
			this.shouldSign = true;
			this.sign = sign;
		}
	};
}

function drawBoard() {
	// fill("white");

	var xInit = 70;
	var yInit = 100;

	for (var y = 0; y < 3; y++) {
		for (var x = 0; x < 3; x++) {
			var newSquare = new CheckerGrid(xInit * x + 150, yInit + 50);
			grids.push(newSquare);
		}
		yInit += 70;
	}

	// print(grids);
}

function mousePressed() {
	for (var i = 0; i < grids.length; i++) {
		grids[i].clicked("x");
	}
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
