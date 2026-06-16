let bob;
let anchor;
let gravity;

let y = 300;
let restLength = 100;
let k = 0.01;
let velocity = 0;

let windowOffset = 5;  
function setup() { 
  createCanvas(windowWidth, windowHeight)
  
  anchor = createVector(windowWidth/2, 5);
  bob = createVector(windowWidth/2+150,300);
  velocity = createVector(0,0);
  gravity = createVector(0, 0.1);
}

function draw() {
  createCanvas((windowWidth) - windowOffset, (windowHeight) - windowOffset);
  anchor.x =windowWidth/2;
  anchor.y =windowHeight/2;


  background(112, 50, 126);
  stroke(255)
  strokeWeight(5);
  fill(245, 120, 0);
  line(anchor.x,anchor.y, bob.x, bob.y);
  circle(anchor.x, anchor.y, 30);
  fill(45, 197, 244);
  circle(bob.x, bob.y, 64);
  
  if(mouseIsPressed){
    bob.x = mouseX;
    bob.y = mouseY;
    velocity.set(0.0);
  }
  
  let springForce = p5.Vector.sub(bob, anchor);
  let x = springForce.mag() - restLength;// displacement value
  springForce.normalize();
  springForce.mult(-1 * k * x);

  velocity.add(springForce);
  velocity.add(gravity);
  bob.add(velocity);
  
  velocity.mult(0.99);//damping
}