class Vehicle{
    constructor(x,y){
      this.traits = {
        r:random(255),
        g:random(255),
        b:random(255),
        size:15,//random(16),
        speed:random(10),
        force:random(1)
      }
      this.location=createVector(x,y)
      //(random(width),random(height));
      this.velocity=createVector(0,0);
      this.acceleration=createVector(random(-5,5),random(-5,5));
      this.r=this.traits.size; //Additional variable for size
      this.maxspeed=10//this.traits.speed;
      this.maxforce=0.4//this.traits.force;
      this.mass=this.traits.size;
      this.lifespan = random(50,3000);
    }
    
    update(){
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.location.add(this.velocity);
      this.acceleration.set(0,0);
      this.wrap();
      this.lifespan -= 1.0;
      // if(this.maxspeed <5
      //   ||this.velocity.mag() <5){ this.wrap() }
      // else{ this.edgeGuard() }
    }
    
    edgeGuard(){
  
        if (this.location.x > width) {
          this.applyForce(createVector(-10, 0));        
        } else if (this.location.x < 0) {
          this.applyForce(createVector(10, 0));
        }
        if (this.location.y > height) {
          this.applyForce(createVector(0, -10)); 
        } else if (this.location.y < 0) {
          this.applyForce(createVector(0, 10));   
        }    
    }
    wrap() {
  //       if (this.location.x > width) {
  //         this.location.x = 0;
  //       } else if (this.location.x < 0) {
  //         this.location.x = width;
  //       }
  //       if (this.location.y > height) {
  //         this.location.y = 0;
  
  //       } else if (this.location.y < 0) {
  //         this.location.y = height;
  //       }
      
      if (this.location.x < -this.r) this.location.x = width+this.r;
      if (this.location.y < -this.r) this.location.y = height+this.r;
      if (this.location.x > width+this.r) this.location.x = -this.r;
      if (this.location.y > height+this.r) this.location.y = -this.r;  
      }
    
    applyForce(force){
      // const f = p5.Vector.div(force, this.mass);
      // this.acceleration.add(f);
      this.acceleration.add(force);
      
    }
    
    follow(flow) {
  // What is the vector at that spot in the flow field?
      let desired = flow.lookup(this.location).copy();
      desired.mult(this.maxspeed);
   
  // Steering is desired minus velocity
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
    
  
    followPath(/*Path*/ p, debug = false) {
      let predict = this.velocity.copy();
      predict.normalize();
      predict.mult(50);
      let predictLoc = p5.Vector.add(this.location, predict);
      
      let target=createVector();
      let normal=createVector();
      let worldRecord = 1000000;
      
      for (let i = 0; i < p.points.length-1; i++){
        let a = p.points[i].copy();
        let b = p.points[i+1].copy();
        let normalPoint = this.getNormalPoint(predictLoc, a, b);
        if (normalPoint.x < a.x || normalPoint.x > b.x) {
          normalPoint = b.copy();
        }
        
        let distance = p5.Vector.dist(predictLoc, normalPoint);
        if (distance < worldRecord) {
          worldRecord = distance;
          normal = normalPoint;
  
          let dir = p5.Vector.sub(b, a);
          dir.normalize();
          dir.mult(10);
          
          target = normalPoint.copy();
          target.add(dir);
        }
      }
      
      if (worldRecord > p.radius) {
        this.applyForce(this.seek(target));
      }
  
      
       // Draw the debugging stuff
      if (debug) {
        // Draw predicted future position
        stroke(0);
        fill(0);
        line(this.location.x, this.location.y, predictLoc.x, predictLoc.y);
        ellipse(predictLoc.x, predictLoc.y, 4, 4);
  
        // Draw normal position
        stroke(0,155,50);
        fill(0);
        ellipse(normal.x, normal.y, 4, 4);
        // Draw actual target (red if steering towards it)
        line(predictLoc.x, predictLoc.y, normal.x, normal.y);
        if (worldRecord > p.radius) fill(255, 0, 0);
        stroke(250,0,175);
        ellipse(target.x, target.y, 8, 8);
      }
    }
    
    getNormalPoint(/*PVector*/ p, /*PVector*/ a, /*PVector*/ b) {
      let ap = p5.Vector.sub(p, a); 
      let ab = p5.Vector.sub(b, a);
      ab.normalize();
      ab.mult(ap.dot(ab));
      // ab.mult(p5.Vector.dot(ap, ab));
  
      let normalPoint = p5.Vector.add(a, ab);
      return normalPoint;
    }
    
    wander(){
      // let xoff =1000;
      // let angle = noise(xoff) * TWO_PI * 2;
      // let steer = p5.Vector.fromAngle(angle);
      // steer.setMag(this.maxforce);
      // this.applyForce(steer);
      // this.xoff += 0.9;
      // return steer;
      return p5.Vector.random2D();
  
    }
    
    evade(vehicle){
      let pursuit = this.pursue(vehicle);
      return pursuit.mult(-1);
    }
    
    flee(target){
      return this.seek(target).mult(-1);
    }
    
    
    pursue(vehicle){
      let target = vehicle.location.copy();
      let prediction = vehicle.velocity.copy().mult(10);
      target.add(prediction);
      return this.seek(target);
    }
    
    seek(target, arrival = false) {
      let force = p5.Vector.sub(target, this.location);
      let desiredSpeed = this.maxspeed;
      if (arrival) {
        let slowRadius = 100;
        let distance = force.mag();
        if (distance < slowRadius) {
          desiredSpeed = map(distance, 0, slowRadius, 0, this.maxspeed);
        }
      }
      force.setMag(desiredSpeed);
      force.sub(this.velocity);
      force.limit(this.maxforce);
      return force;
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
      let theta = this.velocity.heading() + PI/2;
      fill(this.traits.r, 
           this.traits.g, 
           this.traits.b);
      stroke(0);
      push();
      translate(this.location.x, this.location.y);
      rotate(theta);
      beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
      endShape(CLOSE);
      pop();
    }
    
    
  }