import React, { Component, createContext } from 'react'
import reactDom from 'react-dom';

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
            //ctx.fillRect((mouse.x - 382) - rectS.w/2 ,(mouse.y - 122) - rectS.h/2, rectS.w, rectS.h);
            fig.push(new Rect(mouse.x ,mouse.y))
            isRect = false;
            
           } 
           else if(!isRect){
           fig.push(new Circle(mouse.x, mouse.y))
           
           }
           isPressed = false;
           
        }
        setInterval(function() {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (i in fig) {
                fig[i].draw();
        
                if(isCursorInRect(fig[i])){
                    fig[i].stroke();
                }
            }
        },80);

        var isCursorInRect = (rects)=>{
            if (rects instanceof Rect){
            return mouse.x >= rects.x-rects.w/2 && mouse.x <= rects.x + rects.w/2 && mouse.y >= rects.y-rects.h/2 && mouse.y <= rects.y + rects.h/2; 
            }
            else if (rects instanceof Circle){
            return mouse.x >= rects.x-rects.r && mouse.x <= rects.x + rects.r && mouse.y >= rects.y-rects.r && mouse.y <= rects.y + rects.r
            }
        }
        window.onmousedown = function() {
            if (!selected){
                for (i in fig) {
                    var i;
                    if(isCursorInRect(fig[i])){
                    selected = fig[i];
                    }
                }
            }
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