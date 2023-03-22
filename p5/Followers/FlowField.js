class FlowField{
  
    constructor(r){
      this.resolution = r;
      this.cols = width/this.resolution;
      this.rows = height/this.resolution;
      this.field = [];
      this.colours = [];
      this.colour ={
        r:random(255),
        g:random(255),
        b:random(255)};
      this.init();
    }
    
    init() {
      let xoff = 0;
      for (let i = 0; i < this.cols; i++) {
        this.field[i] = [];
        this.colours[i] = [];
        let yoff = 0;
        for (let j = 0; j < this.rows; j++) {
          let theta = map(noise(xoff,yoff),0,1,0,TWO_PI);
          this.field[i][j] = p5.Vector.fromAngle(theta);
          this.colours[i][j] = {
            r:this.colour.r,
            g:this.colour.g,
            b:this.colour.b};
          yoff += 0.1;
        }
        xoff += 0.1;
      }
    }
    
      lookup(lookup, scale) {
      let column = floor(
        constrain(lookup.x/this.resolution,0,this.cols-1));
      let row = floor(
        constrain(lookup.y/this.resolution,0,this.rows-1));
      return  this.field[column][row];
    }
    
    display(){
      let size = 5;
      for(let i=0; i<this.field.length;i++){
        for(let j =0; j< this.field[i].length; j++){
           this.drawVector(this.field[i][j],
                      i*this.resolution,
                      j*this.resolution,
                      this.resolution-2,
                          this.colours[i][j]);
        }
      }
  
    }
    
    // Renders a vector object 'v' as an arrow and a position 'x,y'
     drawVector(v, x, y, scayl, colour) {
      push();
        let arrowsize = 4;
        // Translate to position to render vector
        translate(x,y);
        stroke(colour.r, colour.g, colour.b);
        strokeWeight(2);
        // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
        rotate(v.heading());
        // Calculate length of vector & scale it to be bigger or smaller if necessary
        let len = v.mag()*scayl;
        // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
        line(0,0,len,0);
        line(len,0,len-arrowsize,+arrowsize/2);
        line(len,0,len-arrowsize,-arrowsize/2);
      pop();
    }
  }