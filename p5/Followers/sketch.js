let followers=[]

setup = () => {
  createCanvas(windowWidth, windowHeight);
  target = new Vehicle(random(width), random(height));
  path = new Path();
  flowField = new FlowField(10);

  
  for(let i=0; i<3; i++)
  followers.push(new Vehicle(1, 1));
}

function mousePressed(){
  path.addPoint(mouseX, mouseY);
}
    draw = () => {
      createCanvas(windowWidth, windowHeight);
      background(200);
      //illustrative scaffolding
      // strokeWeight(5);
      // stroke(255);
      // noFill();
      // ellipse(target.location.x, target.location.y, r);
      // push();
      // strokeWeight(15);
      // stroke(255,5,5);
      //   translate(target.location.x, target.location.y);
      //   point(x,y);
      // pop();

      path.display();
      followers.forEach(follower=>{
        follower.update();
        // follower.applyForce(
        // follower.seek( createVector(mouseX,mouseY)));
        follower.followPath(path, true);
        follower.follow(flowField);
        follower.display();
      });
  };
