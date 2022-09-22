class Oscillator {

    constructor(velocity) {
      this.angle = new createVector();
      
      this.velocity = velocity? velocity: new createVector(
        random(-0.05,0.05),random(-0.05,0.05));
      
      this.amplitude = new createVector(
        random(width/2),random(height/2));
        this.color = {
            r: random(255),
            g:random(255),
            b:random(255)
        }
        this.c_size = random(16, 75);

    }
  
    oscillate() {
      this.angle.add(this.velocity);
    }
  
    display() {
      //Random velocities and amplitudes
      let x = cos(this.angle.x)*this.amplitude.x; //Oscillating on the x-axis
      let y = sin(this.angle.y)*this.amplitude.y; //Oscillating on the y-axis
      push();
      translate(width/2,height/2);
      stroke(0);
      fill(this.color.r,this.color.g,this.color.b);
      // The Nature of Code (v1.0)
      // 121
      // Drawing the Oscillator as a line connecting
      // a circle
      line(0,0,x,y);
      ellipse(x,y,this.c_size,this.c_size);
      pop();
    }
  }