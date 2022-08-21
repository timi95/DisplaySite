let vehicles=[];
let vehicleSystems=[];

let boidFlocks=[]

function mousePressed(){
  // vehicleSystems.push(new VehicleSystem(mouseX, mouseY));
  boidFlocks.push(new Flock(mouseX, mouseY));
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(150);
  boidFlocks.forEach(flock=>{
    flock.run();
  });
  // vehicleSystems.forEach(vs=>{  
  //   vs.separate(vs.vehicles);
  //   vs.update();
  //   vs.display();
  // });
}
