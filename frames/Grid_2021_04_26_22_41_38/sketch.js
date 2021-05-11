let img; // Declare variable 'img'.
var images = [];
CanvasWidth = 1920;
CanvasHeight = 1080;
colNum = 20;
rowNum = 12;
colWidth = CanvasWidth / colNum;
rowHeight = CanvasHeight / rowNum;
function preload() {
	for (var i = 0; i<23; i++){
		images[i] = loadImage("Assets/img" + i + ".jpg")
	}
}
function setup() {
  createCanvas(CanvasWidth, CanvasHeight);
  background(0)
  preload();
}
function draw() {
var x = 0;
var y = 0;
	for (var i = 0; i < images.length; i++) {
		image(images[i], x, y, colWidth, rowHeight);	
			x = x + colWidth;
				if (x >= CanvasWidth) {
					x = 0;
					y = y + rowHeight;
				}
		}
}