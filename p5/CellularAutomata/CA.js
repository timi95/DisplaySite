class CA {
  constructor(ca_width){
    this.generation=0;
    this.w=5;
    this.cells = new Array(1050/this.w).fill(0);
    this.newcells = new Array(this.cells.length);
    this.ruleset = [0,0,0,0,0,0,0,0]
      //[0,1,0,1,1,0,1,0];// [1,1,0,1,1,1,1,0]//
    
    this.ALLRULES = [];
    this.ruleCount = 0;
    for(let i=0; i<256;i++){
      this.ALLRULES
        .push(
          Array.from(
                String(this.dec2bin(i)),
                toNum=>Number(toNum)));
    }//rules from 0 to 256 populated in ALLRULES

    this.randRuleSet = [
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
    ]
    this.color = {
      r:random(255),
      g:random(255),
      b:random(255)
    }
    
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = 0;
    }
    this.cells[this.cells.length/2] = 1;

  }
  
  dec2bin(dec){
    return (dec >>> 0).toString(2);
  }
  
  generate() {
    let nextgen = new Array(this.cells.length).fill(0);
    for (let i = 1; i < this.cells.length-1; i++) {
      let left = this.cells[i-1];
      let me = this.cells[i];
      let right = this.cells[i+1];
      nextgen[i] = this.rules(left, me, right);
    }
    this.cells = nextgen;
    this.generation++;
  }
  
  rules(a, b, c){
    let s = "" + a + b + c;
    let index = parseInt(s,2);
    return this.ruleset[index];
  }
   
  randomRules(a, b, c){
    let s = "" + a + b + c;
    let index = parseInt(s,2);
    return this.randRuleSet[index];
  }
  initRandomRuleset(){
    this.ruleset=[
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
      random([0,1]),
    ]
  }
  
  nextRule(){
    this.ruleCount = 
      this.ruleCount > 256?0:this.ruleCount++;
    return this.ALLRULES[this.ruleCount];
  }
  
  display(){
    for (let i = 0; i < this.cells.length; i++) { 
      if (this.cells[i] == 0) 
        fill(this.color.r+noise(i), 
             this.color.g+noise(i+500), 
             this.color.b+noise(i+1000));
      else fill(0); 
      stroke(0);
      rect(i*this.w, this.generation*this.w, 
           this.w,this.w);
    }
    
    setInterval(()=>{
      if(this.generation>(150)){
        this.generation = 0;
        this.color = {
          r:random(255),
          g:random(255),
          b:random(255)
        }
        this.initRandomRuleset();
        // if(this.ruleCount > 255)
        //   this.ruleCount = 0; else
        //   this.ruleset = this.ALLRULES[this.ruleCount++]      
      }
    },3000)

  }
}