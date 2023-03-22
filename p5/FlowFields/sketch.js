  setup = () => {
    createCanvas(windowWidth, windowHeight);
      target = new Vehicle(random(width), random(height));
      flowField = new FlowField(10);
    }
    
    draw = () => {
      createCanvas(windowWidth, windowHeight);
      background(120);
      flowField.display();

    target.update();
    target.follow(flowField);  
    target.display();
  };
