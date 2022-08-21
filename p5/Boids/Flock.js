class Flock {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.boids = [];
    this.setup();
  }
  
  setup() {
    for (let i = 0; i < 50; i++) {
      // this.addBoid(new Boid(this.x, this.y));
      this.addBoid(new Boid(random(width), random(height)));
      
    }
  }
  
  run() {
    this.boids.forEach(boid=>{
      boid.flock(this.boids);
      boid.update();
      boid.display();
    });
  }

  addBoid(b) {
    this.boids.push(b);
  }
}