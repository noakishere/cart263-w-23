// Author: Kamyar Karimi
// Project: Data Viz exercise

let table;
let members = [];

function preload() {
	table = loadTable("EVA_Data.csv", "csv", "header");
}

function setup() {
	createCanvas(1000, 500);
	background("black");

	console.log(table.getRowCount() + " total rows in table");
	console.log(table.getColumnCount() + " total columns in table");
	console.log(table.getColumn("Crew"));
	// use a nested for loop to cycle through the table's cells
	for (var r = 0; r < table.getRowCount(); r++) {
		var newCrewMember = new CrewMember(table.getString(r, 2), table.getString(r, 1));
		members.push(newCrewMember);
	}
}

function draw() {
	background("black");
	members.forEach((member) => {
		member.drawCircle();
		member.drawName();
	});
}

class CrewMember {
	constructor(name, nationality) {
		this.name = name;
		this.nationality = nationality;
		this.memberCircleX = random(width);
		this.memberCircleY = random(height);
	}

	drawCircle() {
		if (this.nationality === "USA") {
			fill("blue");
		} else {
			fill("red");
		}
		circle(this.memberCircleX, this.memberCircleY, 50);
		noFill();
	}

	drawName() {
		// console.log(this.name);
		fill("white");
		text(this.name, this.memberCircleX - 25, this.memberCircleY + 5);
		noFill();
	}
}
