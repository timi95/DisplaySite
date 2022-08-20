class ParticleSystem{
  constructor(x,y){
  this.location = createVector(x,y);
  this.particles = [];
  }
  
  emit(num){
    const number = num? num: 5;
    for(let i = 0; i < number; i++) {
      if(random(1) < 0.5){
            this.particles.push (
            new RectangleP(
              this.location.x, 
              this.location.y));
      } else {
         this.particles.push (
          new Particle(
            this.location.x,
            this.location.y));
      }

  }
  }
  
  update(){
    
  
    this.particles.forEach(p=>{
      p.update();
    });      

  for(let i = this.particles.length-1; i >=0; i--)
    if( this.particles[i].isDead() ) 
    { this.particles.splice(i,1); }
    
  }
  
  display(){
    this.particles.forEach(p=>{
      p.display();
    });    
  }
  

}