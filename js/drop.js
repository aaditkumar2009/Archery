function Drop() {
	this.x = random(width);
	this.y = -50;
	this.speed = random(5, 20);
	this.height = random(10, 40);
}

Drop.prototype.show = function() {
	stroke(color(0, 0, 255));
	line(this.x, this.y, this.x, this.y + this.height);
}

Drop.prototype.update = function() {
	this.y += this.speed;
}

Drop.prototype.bad = function() {
	return (this.y > height);
}