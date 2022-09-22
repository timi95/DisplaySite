  setup = () => {
    oscillator = new Oscillator();

    createCanvas(windowWidth, windowHeight);
    rgb = color(random(150), random(150), random(150))
    alpha = random(10)
    // background(rgb,alpha);
    setInterval(background(rgb,alpha), 1);
  }

  draw = () => {

    // createCanvas(windowWidth, windowHeight);
    oscillator.oscillate();
    oscillator.display();
  };
