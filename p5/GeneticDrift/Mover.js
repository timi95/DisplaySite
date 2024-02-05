class Mover{
  //2.2 goals implement applyForce(); implement forces like wind, and gravity
  
  constructor(mass,location, colour){


    //start location in the center of the screen
    this.location = location;
    //initial velocity is zero
    this.velocity=createVector(random(-2,2),random(-2,2));//(0,0);//
    this.acceleration=createVector(-0.001, 0.001);
    //2.4 incorporating mass
    this.mass = mass;
    
    this.health = floor(random(10,100));
    
    /*chapter 3 angle stuff */  
    this.time = random(-1,1);//for the noise map
    this.angle = random(-1,1);
    this.aVelocity = 0;
    this.aAcceleration = 0;//this.acceleration.x/1000;
    this.r = sqrt(this.mass) * 2;
    

    this.chosenColor = colour?colour:
    color(random(255),random(255),random(255));
     this.wandertheta = 0.0;
    this.maxspeed = 2;
    this.maxforce = 0.05;
  }
  
  update(){
    this.wander();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed)
    this.location.add(this.velocity);


    
//     this.aVelocity += this.aAcceleration; //Newfangled angular motion
//     this.angle += this.aVelocity;
    
//     this.velocity = p5.Vector.fromAngle(this.angle);

    
    //2.3 The easiest way to implement clearing the acceleration for each frame is to multiply the
    //PVector by 0 at the end of update().
    this.acceleration.mult(0);
    // this.time+=0.01
  }
  
  display(){
    stroke(10);
      fill(this.chosenColor);
    
    // pushMatrix() and popMatrix() are
    // necessary so that the rotation of this shape
    // doesn’t affect the rest of our world.
    push();
    translate(this.location.x,this.location.y); 
    //Set the origin at the shape’s location.
    this.angle = this.velocity.heading();//points the object in the direction it's heading
    rotate(this.angle);
    triangle(-this.r,-this.r/2,
             -this.r,this.r/2,
             this.r, 0)
   
    pop();
  }

  //2.2 applyForce stub
  applyForce(force){
    //Making a copy of the PVector before using it!
     const f = p5.Vector.div(force, this.mass)/* Newton’s second law (with force accumulation and mass) */
    this.acceleration.add(force);
  }
  
    // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.location); // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  }
  
  wander() {
    let wanderR = 25;
    let wanderD = 80;
    let change = 0.3;
    this.wandertheta += random(-change, change);

    let circlePos = this.velocity.copy();
    circlePos.normalize();
    circlePos.mult(wanderD);
    circlePos.add(this.location);

    let h = this.velocity.heading();

    let circleOffSet = createVector(
      wanderR * cos(this.wandertheta + h),
      wanderR * sin(this.wandertheta + h)
    );
    let target = p5.Vector.add(circlePos, circleOffSet);
    this.seek(target);

    //Render wandering circle, etc.
    if (debug) this.drawWanderStuff(this.location, circlePos, target, wanderR);
  }
  
    // A method just to draw the circle associated with wandering
  drawWanderStuff(location, circlePos, target, rad) {
    stroke(0);
    noFill();
    strokeWeight(1);
    circle(circlePos.x, circlePos.y, rad * 2);
    circle(target.x, target.y, 4);
    line(location.x, location.y, circlePos.x, circlePos.y);
    line(circlePos.x, circlePos.y, target.x, target.y);
  }
  
  checkEdges() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
      } else if (this.location.x < 0) {
        this.velocity.x *= -1;
        this.location.x = 0;
      }

    if (this.location.y > height) {
      this.velocity.y *= -1;
      this.location.y = height;
    }  else if (this.location.y < 0) {
      this.velocity.y *= -1;
      this.location.y = 0;
    }
  }
  
  isDead() {
    if (this.health < 1) {
      return true;
    } else {
      return false;
    }
  
  }

  isFertile() {
    if (this.health <= 10) {
      return true;
    } else {
      return false;
    }
  }
  
  decay(){
    this.health=this.health-1;

  }
  
  moving(){
    if(this.isDead()===false){   
      this.update();
      this.checkEdges();
      this.display();
    }
  }
  
  birth(inheritedColor){
    let litter=[]
    for(let i = 0; i < floor(random(0,4)); i++){
      let baby = new Mover(
          this.mass, 
          createVector(this.location.x, this.location.y), 
          inheritedColor?inheritedColor:this.chosenColor);
      baby.angle = random(-1,1)
      litter.push(
        baby
      );
    }
    this.health = 0;
    return litter;
  }
  
  mating(movers){
    for(let i=0; i<movers.length; i++){     
     let distance = this.location.dist(movers[i].location);
      let colourTrait = createVector(this.chosenColor.levels[0],
                                 this.chosenColor.levels[1],
                                 this.chosenColor.levels[2])
      let mateColourTrait = createVector(movers[i].chosenColor.levels[0],
                                 movers[i].chosenColor.levels[1],
                                 movers[i].chosenColor.levels[2])
      let colourDistance = colourTrait.dist(mateColourTrait);
      // console.log(colourDistance)
      if(distance <= this.r+10 
         && colourDistance > 100
         && this.chosenColor != movers[i].chosenColor){
        let newColor= color(
          (this.chosenColor.levels[0] + movers[i].chosenColor.levels[0])/2,
          (this.chosenColor.levels[1] + movers[i].chosenColor.levels[0])/2,
          (this.chosenColor.levels[2] + movers[i].chosenColor.levels[0])/2)
        let loveChild = this.birth(newColor)
        loveChild.mass = (this.mass + movers[i].mass)/2
        loveChild.health = 10;
        
        return loveChild
      }
    }
    return []
  }
}