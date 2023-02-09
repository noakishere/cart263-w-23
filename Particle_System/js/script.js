/**
Title of Project: Feeling lonely in a crowd
Author Kamyar Karimi

This project is an exercise on particle systems in P5js
*/

"use strict";

let fadingCircularParticles = [];

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
	createCanvas(750, 750);
	background("black");

	let p = new FadingCircularParticle();
	fadingCircularParticles.push(p);
}

/**
Description of draw()
*/
function draw() {
	background("black");

	// for (let i = 0; i < 5; i++) {
	// 	let p = new Particle();
	// 	particles.push(p);
	// }

	for (let i = 0; i < fadingCircularParticles.length; i++) {
		fadingCircularParticles[i].update();
		fadingCircularParticles[i].show();
		fadingCircularParticles[i].fear();

		if (fadingCircularParticles[i].finished()) {
			fadingCircularParticles.splice(i, 1);
		}
	}
}

function mousePressed() {
	let p = new FadingCircularParticle();
	fadingCircularParticles.push(p);
}

class FadingCircularParticle {
	constructor() {
		this.x = 300;
		this.y = 380;
		this.vx = random(-1, 1);
		this.vy = random(-5, -1);
		this.alpha = 255;
		this.centerX = width / 2;
		this.centerY = height / 2;
		this.angle = 0;
		this.speed = 0.05;
		this.radius = 150;
	}

	show() {
		noStroke();
		fill(255, this.alpha);
		ellipse(this.x, this.y, 16);
	}

	update() {
		this.x = this.centerX + this.radius * cos(this.angle);
		this.y = this.centerY + this.radius * sin(this.angle);
		this.angle = this.angle + this.speed;
		this.alpha -= 0.5;
	}

	finished() {
		return this.alpha < 0;
	}

	fear() {
		if (dist(this.x, this.y, mouseX, mouseY) <= 5) {
			this.x += random(5, 10);
			this.y += random(5, 10);
		}
	}
}
