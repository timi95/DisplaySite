class RectangleP extends Particle {
  constructor(x,y){
    super(x,y);
    this.r = 10
  }
  
  update(){
    super.update();
  }

  
  display(){
    let theta = map(this.location.x,0,width,0,TWO_PI*2);
    angleMode(DEGREES);
    push();
        rectMode(CENTER);

        translate(this.location.x, this.location.y);
        rotate(this.angle);
        stroke(0,this.lifespan);
        fill(
          this.colour.r,
          this.colour.g,
          this.colour.b, 
             this.lifespan);
        rect(0, 0,this.r*2,this.r);
    pop(); 

  }
}