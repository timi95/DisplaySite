class Mover{
  //2.2 goals implement applyForce(); implement forces like wind, and gravity
  
  constructor(mass,location, color){


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
    
    this.colors =['red','green', 'blue', 'yellow','purple','black','white'] 
    this.chosenColor = color? color: this.colors[floor(random(0,7))];
    
  }
  
  update(){

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed)
    this.location.add(this.velocity);

    //static function returns a p5 vector object
    //p5.Vector.add(this.velocity, this.acceleration);

    this.aVelocity += this.aAcceleration; //Newfangled angular motion
    this.angle += this.aVelocity;
    
    this.velocity = p5.Vector.fromAngle(this.angle);

    
    //2.3 The easiest way to implement clearing the acceleration for each frame is to multiply the
    //PVector by 0 at the end of update().
    this.acceleration.mult(0);
    this.time+=0.01
  }
  
  display(){
    stroke(10);
      fill(this.chosenColor);
    // fill(175);
     /*ellipse(
       this.location.x,this.location.y,
      1.6*this.mass, 1.6*this.mass);*/
    // rectMode(CENTER);
    // rect(0,0,this.mass*2,this.mass*2);
    
    
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
    this.acceleration.add(f);
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
      // console.log("health:", this.health)
      return false;
    }
  
  }
  isPregnant() {
    if (this.health == 20) {
      return true;
    } else {
      return false;
    }
  
  }
  
  decay(){
    this.health=this.health-1;

  }
  
  moving(){
    // if(floor(random(1000000))%2==0){this.decay();}
    if(this.isDead()===false){   
      this.update();
      this.checkEdges();
      this.display();
    }
  }
  
  birth(){
    let litter=[]
    for(let i = 0; i < floor(random(0,4)); i++){
      let baby = new Mover(
          this.mass, 
          createVector(random(0, this.location.x), random(0,this.location.y)), 
          this.chosenColor);
      baby.health = floor(random(10,100));
      litter.push(
        baby
      );
    }
    return litter;
  }
  
}