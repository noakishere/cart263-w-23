/**
Title of Project Intersectional meanings and purposes
Author Name Kamyar Karimi

This project is done for CART 263 course. The purpose of the project is to work with databases and csv tables using p5js built-in functions.
The project's aim is create a creative visual presentation of the every data points that are provided by numerous databases around the internet.
*/

"use strict";

// Sound configs
let mainPadAddress = "assets/sounds/main-pad.mp3";
let mainPad;

let soundsAddress = [
	"assets/sounds/sound01.mp3",
	"assets/sounds/sound02.mp3",
	"assets/sounds/sound03.mp3",
	"assets/sounds/sound04.mp3",
	"assets/sounds/sound05.mp3",
];
let soundsList = [];

let finalSoundAddress = "assets/sounds/final-sound.mp3";
let finalSound;

// Table configs
let table1;

let menTable = {
	age: [],
	immigrants: [],
	visibleMinority: [],
	disability: [],
	lgbt: [],
};

let womenTable = {
	age: [],
	immigrants: [],
	visibleMinority: [],
	disability: [],
	lgbt: [],
};

let movementSequences = {}; //main object of sequences that holds the drawing events with the respective sounds to be played

let arraysToDraw = []; // after each iteration of the sequences, the arrays to be drawn get added to this main array

// flags
let seqIndex = 0;
let timeCounter = 0;
let drawPoints = false;
let shouldCount = true;
let movePointsAround = false;
let isPieceDone = false;

// int instead of a boolean, because it needed to be triggered inside the draw function, and in the conditional it only gets called when it's 1
// so it prevents from the sound loop to keep repeating itself.
let finalSoundPlay = 0;

/**
Description of preload
*/
function preload() {
	table1 = loadTable("assets/csv/meaning-purpose-gender.csv", "csv", "header");

	// sound preloads
	for (var i = 0; i < soundsAddress.length; i++) {
		soundsList[i] = loadSound(soundsAddress[i]);
	}

	mainPad = loadSound(mainPadAddress);
	finalSound = loadSound(finalSoundAddress);
}

/**
Description of setup
*/
function setup() {
	createCanvas(750, 500);
	background("black");

	populateMenTable();
	populateWomenTable();
	setupMovementSequences();

	// main pad configs
	mainPad.setVolume(0.2);
	mainPad.loop();
}

/**
Description of draw()
*/
function draw() {
	if (!isPieceDone) {
		background("black");
		writeSectionNames();

		// main conditional process for the data points sequences to be drawn
		if (seqIndex < Object.keys(movementSequences.phase1).length) {
			//checks the index counter vs the length of the main object of sequences
			if (timeCounter != movementSequences.phase1[seqIndex].timeToWait) {
				drawPoints = false;
				timeCounter++;
			} else if (timeCounter == movementSequences.phase1[seqIndex].timeToWait) {
				timeCounter = 0;

				arraysToDraw.push(movementSequences.phase1[seqIndex].targetArray);

				movementSequences.phase1[seqIndex].soundToPlay.play();

				seqIndex++;
			}
		} else {
			mainPad.stop();
			if (timeCounter != movementSequences.phase1[1].timeToWait) {
				timeCounter++;
			} else {
				movePointsAround = true;

				finalSoundPlay++; //trigger index just to make sure the song plays at the right time

				// only plays the song once int hits 1, prevents repetition in draw function
				if (finalSoundPlay == 1) {
					finalSound.setVolume(0.5);
					finalSound.play();
					finalSound.onended(() => {
						isPieceDone = true; // finishing the piece at the end of the song
					});
				}
			}
		}

		// only draws the arrays that hold the tables that we want to show, one at a time.
		arraysToDraw.forEach((element) => {
			element.forEach((dataPoint) => {
				dataPoint.drawDataPoint();
			});
		});

		drawSectionLines();
	} else {
		background("black");
	}
}

// Main class for the datapoints
class DataPoint {
	constructor(posX, posY, category, dataNum, rating = 0) {
		this.posX = posX;
		this.posY = posY;
		this.category = category;
		this.color = color;
		this.dataNum = dataNum;
		this.rating = rating;
	}

	drawDataPoint() {
		this.decideColor();

		// only shown at the end when all the data points are presented
		// process of decategorizing the points and breaking free
		if (movePointsAround) {
			circle(
				random(this.posX + random(-250, 250), this.posX),
				random(this.posY + random(-250, 250), this.posY),
				random(this.rating - 0.5 * 2, this.rating * 2)
			);
		} else {
			circle(this.posX, this.posY, this.rating);
		}
	}

	// fill color to differentiate the data entries according to the sheet
	decideColor() {
		if (this.category === "men") {
			fill("#589651");
		} else if (this.category === "women") {
			fill("#c4c8db");
		}
	}
}

// Populating the main sequences of the piece
// Scripted sequences of data presentation
function setupMovementSequences() {
	movementSequences = {
		phase1: {
			0: {
				targetArray: menTable.age,
				soundToPlay: soundsList[0],
				timeToWait: 350,
				label: "15+",
			},
			1: {
				targetArray: menTable.immigrants,
				soundToPlay: soundsList[1],
				timeToWait: 350,
				label: "Immigrants",
			},
			2: {
				targetArray: menTable.visibleMinority,
				soundToPlay: soundsList[2],
				timeToWait: 350,
				label: "Visible Minority",
			},
			3: {
				targetArray: menTable.disability,
				soundToPlay: soundsList[3],
				timeToWait: 350,
				label: "Disability",
			},
			4: {
				targetArray: menTable.lgbt,
				soundToPlay: soundsList[4],
				timeToWait: 350,
				label: "LGBT",
			},
			5: {
				targetArray: womenTable.age,
				soundToPlay: soundsList[0],
				timeToWait: 350,
				label: "15+",
			},
			6: {
				targetArray: womenTable.immigrants,
				soundToPlay: soundsList[1],
				timeToWait: 350,
				label: "Immigrants",
			},
			7: {
				targetArray: womenTable.visibleMinority,
				soundToPlay: soundsList[2],
				timeToWait: 350,
				label: "Visible Minority",
			},
			8: {
				targetArray: womenTable.disability,
				soundToPlay: soundsList[3],
				timeToWait: 350,
				label: "Disability",
			},
			9: {
				targetArray: womenTable.lgbt,
				soundToPlay: soundsList[4],
				timeToWait: 350,
				label: "LGBT",
			},
		},
	};
}

// Dividing the 6 sections with white lines
function drawSectionLines() {
	stroke("white");

	//vertical lines
	for (var i = 1; i < 4; i++) {
		line((width / 3) * i, 0, (width / 3) * i, height);
	}

	//middle horizontal line
	line(0, height / 2, 750, height / 2);
}

// Labeling each section
// Hardcoded scripts for the read me section
function writeSectionNames() {
	fill("white");

	// Labels
	textSize(12);
	text("15+", 250 / 2 - 10, 20);
	text("Immigrants", 350, 20);
	text("Visible Minorities", 580, 20);
	text("Disabilities", 100, 270);
	text("LGBTQ2+", 350, 270);
	text("Read me", 590, 270);

	// Read me text
	textSize(8);
	textStyle(NORMAL);
	strokeWeight(0.3);
	text(
		"Canadians were asked to rate their sense of meaning and purpose",
		505,
		300
	);
	text("Green=Men, Purple=Women", 505, 320);
	text("Each circle represents a range of answers between 0-10", 505, 340);
	text("Binary databases", 505, 370);
	text("Binary questions", 505, 390);
	text("In an intersectional world", 505, 430);
	text("Looking for meanings and purposes", 505, 450);
	text("We're all data points", 505, 480);
	text("Floating in categories", 505, 490);
}

// Main function that takes data from the table to populate in array
// taken from the meaning-purpose-gender.csv file
function populateMenTable() {
	for (var r = 9; r < 14; r++) {
		// each column: 0-5, 6-7, 8-10
		for (var c = 5; c < 8; c++) {
			var newManData = new DataPoint(
				random(50, 200),
				random(50, 220),
				"men",
				table1.getString(r, c),
				c + 2
			);
			menTable.age.push(newManData);
		}
	}

	//immigrants
	for (var r = 15; r < 19; r++) {
		// each column: 0-5, 6-7, 8-10
		for (var c = 5; c < 8; c++) {
			var newManData = new DataPoint(
				random(270, 480),
				random(50, 220),
				"men",
				table1.getString(r, c),
				c + 2
			);
			menTable.immigrants.push(newManData);
		}
	}

	//visible minority
	// each column: 0-5, 6-7, 8-10
	for (var c = 5; c < 8; c++) {
		var newManData = new DataPoint(
			random(520, 730),
			random(50, 220),
			"men",
			table1.getString(19, c),
			c + 2
		);
		menTable.visibleMinority.push(newManData);
	}

	// disability
	// each column: 0-5, 6-7, 8-10
	for (var c = 5; c < 8; c++) {
		var newManData = new DataPoint(
			random(50, 200),
			random(300, 480),
			"men",
			table1.getString(25, c),
			c + 2
		);
		menTable.disability.push(newManData);
	}

	//LGBTQ2+
	for (var c = 5; c < 8; c++) {
		var newManData = new DataPoint(
			random(270, 480),
			random(300, 480),
			"men",
			table1.getString(28, c),
			c + 2
		);
		menTable.lgbt.push(newManData);
	}
}

// Main function that takes data from the table to populate in array
// taken from the meaning-purpose-gender.csv file
function populateWomenTable() {
	for (var r = 9; r < 14; r++) {
		// each column: 0-5, 6-7, 8-10
		for (var c = 8; c < 11; c++) {
			var newWomanData = new DataPoint(
				random(50, 200),
				random(50, 220),
				"women",
				table1.getString(r, c),
				c + 2
			);
			womenTable.age.push(newWomanData);
		}
	}

	//immigrants
	for (var r = 15; r < 19; r++) {
		// each column: 0-5, 6-7, 8-10
		for (var c = 8; c < 11; c++) {
			var newWomanData = new DataPoint(
				random(270, 480),
				random(50, 220),
				"women",
				table1.getString(r, c),
				c + 2
			);
			womenTable.immigrants.push(newWomanData);
		}
	}

	//visible minority
	// each column: 0-5, 6-7, 8-10
	for (var c = 8; c < 11; c++) {
		var newWomanData = new DataPoint(
			random(520, 730),
			random(50, 220),
			"women",
			table1.getString(19, c),
			c + 2
		);
		womenTable.visibleMinority.push(newWomanData);
	}

	// disability
	// each column: 0-5, 6-7, 8-10
	for (var c = 8; c < 11; c++) {
		var newWomanData = new DataPoint(
			random(50, 200),
			random(300, 480),
			"women",
			table1.getString(25, c),
			c + 2
		);
		womenTable.disability.push(newWomanData);
	}

	//LGBTQ2+
	for (var c = 8; c < 11; c++) {
		var newWomanData = new DataPoint(
			random(270, 480),
			random(300, 480),
			"women",
			table1.getString(28, c),
			c + 2
		);
		womenTable.lgbt.push(newWomanData);
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
