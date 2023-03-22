class Path{
    constructor(){
      this.radius = 20;
      this.start = createVector(0,height/3);
      this.end = createVector(width,2*height/3);
      this.points=[]
    }
    
    addPoint(x, y) {
      let point = createVector(x,y);
      this.points.push(point);
      // console.log(this.points)
    }
    
    display() { // Display the path.
      
          // Draw thick line for radius
      stroke(175);
      strokeWeight(this.radius*2);
      noFill();
      beginShape();
      this.points.forEach(v=>{
        vertex(v.x, v.y);
      });
      endShape();
      
      stroke(0);
      strokeWeight(7);
      noFill();
      beginShape();
      this.points.forEach(v=>{
        vertex(v.x,v.y);
        // point(v.x,v.y);
      });
      endShape();
    }
  }