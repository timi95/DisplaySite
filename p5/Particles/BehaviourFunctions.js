
function attractionBehaviour(attractor, mover, polarity) {
    const G = 1;
    let attraction = p5.Vector.sub(attractor.location, mover.location);
    let distance = attraction.mag();
    distance = constrain(distance,5,25);
    attraction.normalize();
    let strength = (G * attractor.mass * mover.mass) / (distance * distance);
    
    attraction.mult(strength); /* What’s the force’s magnitude?*/
    if(polarity == -1){
      attraction.mult(-1);
    }
    mover.applyForce(attraction);
  }

function dragBehaviour(object, liquid) {
  let speed = object.velocity.mag();
  let dragMagnitude = liquid.c * speed * speed; //The force’s magnitude: Cd * v~2~
  let drag = object.velocity.copy();
  drag.mult(-1);
  drag.normalize(); /*The force's direction: -1 * velocity
  Finalize the force: magnitude and direction
  // together.*/
  drag.mult(dragMagnitude);
  object.applyForce(drag);
}

function gravityBehaviour(object){
  if(object.mass!==null||object.mass!==undefined&&object.mass){
    const gravity = createVector(0, 0.1*object.mass);
    object.applyForce(gravity);
  }
}

function frictionBehaviour(object){
  const c = 0.01; //the coefficient of friction
  const normal = 1;//normal force of friction
  const frictionMag = c*normal;
  
  let friction = object.velocity.copy();
  friction.mult(-1);
  friction.normalize();
  friction.mult(frictionMag);
  
  object.applyForce(friction);
}

function floatUpBehaviour(object){
  const floating = createVector(0,-0.1);
  object.applyForce(floating);
}

function followMouseBehaviour(object){
  //ball follows mouse
  // dir is a PVector that points from the ball’s location all the way to the mouse.
  const mouse = createVector(mouseX,mouseY);
  let dir = p5.Vector.sub(mouse,object.location);
  dir.normalize();
  dir.mult(0.4);
  object.applyForce(dir);
}

function westernWind(object){
  //a wind that pushes from left to right
  let noiseMap = map(noise(wind_noise_t),0,1,0,1);
  let noiseMap2 = map(noise(wind_noise_t2),0,1,-1,1);

  wind_noise_t+=0.01;
  wind_noise_t2+=0.02;
  
  let wind = createVector(noiseMap, noiseMap2);
  wind.mag(0.1)
  object.applyForce(wind);
}

function rotationBehaviour(object){
    
  push();
    translate(object.location.x, object.location.y);
    rotate(object.angle);
    object.draw();
    // angle += 0.01;
    object.aVelocity += object.aAcceleration;
    object.angle += object.aVelocity; 
  pop();
}
