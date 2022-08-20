let particles=[];
let particleSystems=[];

function mousePressed(){
  particleSystems.push( new ParticleSystem(mouseX, mouseY))
}

function setup() { 
  createCanvas(windowWidth, 400);

  repellant = new Attractor();
//   particleSystems[0] = new ParticleSystem(width/2, 50);
   
}

function draw() {
  background(100);
  createCanvas(windowWidth, 400);
  
  //   for(let i =0; i<5; i++) {
  //   particles.push (
  //     new Particle( createVector(width/2, 50))
  //   );
  // }
  
  
  // console.log(particles.length);
//   particles.forEach(p=>{
//     p.run();
//   });
  
//   for(let i = particles.length-1; i >=0; i--)
//     if( particles[i].isDead() ) 
//     { particles.splice(i,1); }
  particleSystems.forEach(ps=>{  
    ps.particles.forEach(p=>{
      attractionBehaviour(repellant,p,-1);
      gravityBehaviour(p);
    });
    ps.emit(1);
    ps.update();
    ps.display();
  });
  repellant.display();
}
