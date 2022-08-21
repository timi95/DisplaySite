class Boid extends Vehicle {
  constructor(x,y){
    super(x,y)
  }
  
  
  separate(boids){
    let sum = createVector();
    let count = 0;
    let desiredSeparation = this.r*2;
    for(let i=0; i < boids.length; i++){
      for(let j=0; j < boids.length; j++){
        
          let d = p5.Vector.dist(
            boids[i].location, 
            boids[j].location);
        
        
          if ((d > 0) && (d < desiredSeparation)) {
            let diff = p5.Vector.sub(
              boids[i].location, 
              boids[j].location);
            
            diff.normalize();
            diff.div(d);
            sum.add(diff);
            count++;
          }
        
          if(count > 0){
            // sum.div(count);
            // sum.normalize();
            // sum.mult(boids[j].maxspeed);
            // let steer = p5.Vector.sub(sum, boids[i].velocity);
            // steer.limit(boids[i].maxforce);
            // return steer;
            return boids[i].evade(boids[j]);
          } else {
            return createVector(0,0);
          }
        
      }
      
    }
    
  }
    
  align(boids){
    let sum = new createVector(0,0);
    let neighbordist = 100;
    let count = 0;
    boids.forEach( other =>{
      let d = p5.Vector.dist(this.location,other.location);
      if ((d > 0) && (d < neighbordist)) {
      sum.add(other.velocity);
        count++; /*For an average, we need to keep track of
how many boids are within the distance.*/
      }
    });
    
    if(count >0) {
      sum.div(count);
      // We desire to go in that direction at
      // maximum speed.
      sum.setMag(this.maxspeed);

      /*Reynolds’s steering force formula*/
      let steer = p5.Vector.sub(sum, this.velocity); 
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
    
  }
  
  cohere(boids){
    let sum = new createVector(0,0);
    let neighbordist = 50;
    let count = 0;
    boids.forEach( other =>{
      let d = p5.Vector.dist(this.location,other.location);
      if ((d > 0) && (d < neighbordist)) {
      sum.add(other.location);
        count++; /*For an average, we need to keep track of
how many boids are within the distance.*/
      }
    });
    
    if(count >0) {
      sum.div(count);
      return this.seek(sum, true);
    } else {
      return createVector(0,0);
    }
  }
  
  flock(boids){
    let sep = this.separate(boids); //The three flocking rules
    let ali = this.align(boids);
    let coh = this.cohere(boids);
    // Arbitrary weights for these forces (Try
    // different ones!)
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    
    this.applyForce(sep); //Applying all the forces
    this.applyForce(ali);
    this.applyForce(coh);
  }
}