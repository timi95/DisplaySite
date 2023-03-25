class Cell {
    constructor(_x,_y,_w,_state){
      this.w=_w
      this.x=_x;
      this.y=_y;
      this.state=_state;
      this.previous=0;
    }
    
    newState(newState){
      this.previous=this.state;
      this.state=newState;
    }
    
    display(){   
      if (this.previous == 0 
          && this.state == 1){ fill(0,0,random(255)); }
      else if (this.state == 1) { fill(0); }
      else if (this.previous == 1 
               && this.state == 0) { fill(random(255),0,0); }
      else { fill(255); }
    }
  }