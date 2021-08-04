import React, { Component } from 'react'

const styles = {
    canvas:{ 
      outline: '1px solid',
      backgroundColor: 'beige'
    }
}
var mouse = {
    x: 0,
    y: 0,
};
const rectS = {
    w: 280,
    h: 120
};
const circlS = {
    r: 50,
    sa: 0,
    ea: Math.PI*2,
    cl: 0
}
var selected = false, fig = [], i;

class Canvas extends Component {
    componentDidMount(){
      const ctx = this.canvas.getContext('2d');
      var rect = document.getElementById('rect'),
          circ = document.getElementById('circle'),        
          cnv = document.getElementById('canvas'),
          isRect = false,
          isPressed = false;
          ctx.lineWidth = 5;
     
        class Rect{
            constructor(x,y){
              this.x = x;
              this.y = y;
              this.w = rectS.w;
              this.h = rectS.h;
            }
            draw(){
                ctx.fillStyle = 'green';
                ctx.fillRect((this.x-382)-this.w/2 , (this.y-122)-this.h/2, this.w, this.h)
            }
            stroke(){
                
                ctx.strokeStyle = 'red';
                ctx.strokeRect((this.x-382)-this.w/2, (this.y-122)-this.h/2, this.w, this.h)
            }
        }
        class Circle{
            constructor(x,y){
                this.x = x;
                this.y = y;
                this.r = circlS.r;
                this.sa = circlS.sa;
                this.se = circlS.ea;
                this.cl = circlS.cl;
                
            }
            draw(){
                ctx.fillStyle = 'blue';
                ctx.strokeStyle = 'red';
                ctx.beginPath();
                ctx.arc(this.x-382, this.y-122, this.r, this.sa, this.se, this.cl);
                
                ctx.fill();
                ctx.closePath();
            }
            stroke(){
                ctx.stroke();
            }
        } 
      circ.onmousedown = ()=>{
            isPressed = true;
            isRect = false;
      }  
      rect.onmousedown = ()=>{
          isPressed = isRect = true;
      }
      
      cnv.onmouseup = ()=>{
        if(isPressed){
           ctx.beginPath();
           if(isRect){
            fig.push(new Rect(mouse.x ,mouse.y))
            isRect = false;
            
           } 
           else if(!isRect){
           fig.push(new Circle(mouse.x, mouse.y))
           
           }
           ctx.closePath();
           isPressed = false;
           
        }

        var isInArea = (fig)=>{
            if (fig instanceof Rect){
            return mouse.x >= fig.x-fig.w/2 && mouse.x <= fig.x + fig.w/2 && mouse.y >= fig.y-fig.h/2 && mouse.y <= fig.y + fig.h/2; 
            }
            else if (fig instanceof Circle){
            return mouse.x >= fig.x-fig.r && mouse.x <= fig.x + fig.r && mouse.y >= fig.y-fig.r && mouse.y <= fig.y + fig.r
            }
        }

        setInterval(function() {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (i in fig) {
                fig[i].draw();
        
                if(isInArea(fig[i])){
                    //fig[i].stroke();
                }
            }
            if (selected){
                selected.stroke();
                selected.x = mouse.x
                selected.y = mouse.y

            }
            if(selected instanceof Rect){
                if(selected.x + selected.w/2 > this.canvas.width+382){
                    selected.x= this.canvas.width + 380 - selected.w/2;
                    selected = false;
                }
                else if(selected.y + selected.h/2 > this.canvas.height + 122){
                    selected.y = this.canvas.height + 120 - selected.h/2
                    selected = false;
                }
                else if(selected.x - selected.w/2 < 382){
                    selected.x = selected.w/2 + 382
                    selected = false;
                }
                else if(selected.y - selected.h/2 < 122){
                    selected.y = selected.h/2 + 122;
                    selected = false
                }
            }
            else if (selected instanceof Circle) {
                if(selected.x + selected.r > this.canvas.width+382){
                    selected.x= this.canvas.width + 380 - selected.r;
                    selected = false;
                }
                else if(selected.y + selected.r > this.canvas.height + 122){
                    selected.y = this.canvas.height + 120 - selected.r
                    selected = false;
                }
                else if(selected.x - selected.r < 382){
                    selected.x = selected.r + 382
                    selected = false;
                }
                else if(selected.y - selected.r < 122){
                    selected.y = selected.r + 122;
                    selected = false
                }
            }
        
            
        },30);

        
        window.onmousedown = function() {
            if (!selected){
                for (i in fig) {
                    var i;
                    if(isInArea(fig[i])){
                    selected = fig[i];
                    }
                }
            }
        }
        window.onmouseup = function() { 
            selected = false;
        }
        
    }
    }
    render(){
        //const {width, heihgt} = this.props;
      return <canvas id='canvas'style={styles.canvas} width='1640' height='1000'  ref={node =>(this.canvas = node)}
        >
      </canvas>
    }
}




window.onmousemove = function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
};
export { Canvas}


