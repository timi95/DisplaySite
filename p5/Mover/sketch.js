  let angles=[];
  let angleV=[];
  let angle=0; //Location
  let aVelocity=0; //Velocity
  let aAcceleration=0.001; //Acceleration
  let largestSize=20;
  let movers=[];
  let oscillators=[];
  let waves=[];
  let attractor;
  let r=4//150;

  setup = () => {
    for(let i=0; i< 10; i++) {
      movers.push (
        new Mover(
        random(0.1, largestSize), 
        createVector(random(1, windowWidth), random(1, windowHeight))
        ) );
    }
    createCanvas(windowWidth, windowHeight);
  }

  draw = () => {
    createCanvas(windowWidth, windowHeight);
    background(0);
    movers.forEach(m =>{
      m.update()
      m.display()
      m.checkEdges()
    })
  };
