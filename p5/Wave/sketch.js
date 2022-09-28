let waves=[];
let colours=[];
let r_offset=255;
let g_offset=1255;
let b_offset=2255;

let r_offset2=255;
let g_offset2=1255;
let b_offset2=2255;
setup = () => {
  //Waves setup
  for (let i = 0; i < 5; i++) {
    colours.push({ r:random(250), g:random(250), b:random(250) });
    waves[i] = new Wave(
      random(20, 80), 
      random(100, 600), 
      random(TWO_PI));
  }
  
}

  draw = () => {
    createCanvas(windowWidth, windowHeight);
    
    r_offset+=0.001;
    g_offset+=0.001;
    b_offset+=0.001;
    let noiseMap_r=map(noise(r_offset), 0, 1, 0, 255);
    let noiseMap_g=map(noise(g_offset), 0, 1, 0, 255);
    let noiseMap_b=map(noise(b_offset), 0, 1, 0, 255);
    background(noiseMap_r, noiseMap_g, noiseMap_b);



    //Waves example
    for (let x = 0; x < width; x += 10) {
      r_offset2+=random(0.000001);
      g_offset2+=random(0.000001);
      b_offset2+=random(0.000001);
      let r=map(noise(r_offset2), 0, 1, 0, 255);
      let g=map(noise(g_offset2), 0, 1, 0, 255);
      let b=map(noise(b_offset2), 0, 1, 0, 255);
      
      let y = 0;
      waves.forEach(wave =>  y+= wave.evaluate(x));
      noStroke();
      fill(r,g,b);
      ellipse(x, y + height / 2, 16);
    }

    waves.forEach(wave => wave.update());
};
