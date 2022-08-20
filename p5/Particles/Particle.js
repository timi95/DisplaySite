class Particle {
  
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, 5));
    this.acceleration = createVector( 
      random(-0.06,0.06),
      random(-0.06,0.06));
      
    
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = random(-0.1,0.1);
    
    this.lifespan = 255;
    this.mass = random(1, 15);
    this.colour = {r:random(175),
                  g:random(175),
                  b:random(175)};
    this.r = 10;
  }
  
  
  applyForce(force){
    //Making a copy of the PVector before using it!
     const f = p5.Vector.div(force, this.mass)/* Newton’s second law (with force accumulation and mass) */
    this.acceleration.add(force);
  }
   
  update(){
    // console.log("Acceleration to be added!" ,this.acceleration);    
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    
    // this.aAcceleration = this.acceleration.x;
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    this.acceleration.mult(0);
    this.lifespan -= 2.0
  }
  
   run() {
    this.update();
    this.display();
  }
  
  isDead() {
    if (this.lifespan < 0.0) { 
      //Is the particle still alive?
      return true;
    } else {
      return false;
    }
  }
  
  
  display(){
    angleMode(DEGREES);
    // Since our life ranges from 255 to 0 we can use it for alpha
    push();
        // rectMode(CENTER);
        translate(this.location.x, this.location.y);
        rotate(this.angle);
        stroke(0,this.lifespan);
        fill(
          this.colour.r,
          this.colour.g,
          this.colour.b, 
             this.lifespan);
        ellipse(0,0, this.r*2);
    pop(); 

  }
}