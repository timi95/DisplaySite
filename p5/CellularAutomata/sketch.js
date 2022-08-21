let cA;
let ca2;
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  ca = new CA(1000); 
  
}


function draw() {
  
  // createCanvas(windowWidth, height);
  // background(150);
  ca.display();
  ca.generate();
  
}