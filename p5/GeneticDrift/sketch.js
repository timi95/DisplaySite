let angles=[];
let angleV=[];
let angle=0; //Location
let aVelocity=0; //Velocity
let aAcceleration=0.001; //Acceleration
let largestSize=50;
let movers=[];
let oscillators=[];
let waves=[];
let attractor;
let r=4//150;

function setup() { 
    for(let i=0; i< 5; i++) {
    movers.push (
      new Mover(
      random(0.1, largestSize), 
      createVector(random(1, windowWidth), random(1, windowHeight))
      ) );
  }
  createCanvas(windowWidth, 400);
    setInterval( ()=>{
      
     movers.forEach(mover=>{ 
       mover.decay()
      if(mover.isPregnant()){
        movers.push(...mover.birth())
      }
     
     })
  },
    500
  )
}

function draw() {
  createCanvas(windowWidth, 400);
  background(200,20);
    
   movers.forEach(mover=>{ 
    mover.moving()
   });  
}


