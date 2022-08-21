class Attractor {
// Our Attractor is a simple object that doesn’t
// move. We just need a mass and a location.

  constructor() {
    this.location = new createVector(width/2,height/2);
    this.mass = 20;
    this.G = 1;
  }

  reposition = () => this.location = new createVector(width/2,height/2);
  
   display() {
    stroke(0);
    fill(55,200);
    ellipse(this.location.x,this.location.y, this.mass*2, this.mass*2);
  }
  
  
  attract(mover){
    let force = p5.Vector.sub(this.location, mover.location);
    let distance = force.mag();
    distance = constrain(distance,5,25);
    force.normalize();
    let strength = (this.G * this.mass * mover.mass) / (distance * distance);
    force.mult(strength); /* What’s the force’s magnitude?*/
    return force;
  }
}