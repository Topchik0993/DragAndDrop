import React, { Component } from 'react'
import {cnvCoor,rectS,circlS,styles} from './consts'

var mouse = {
    x: 0,
    y: 0,
};


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
                ctx.fillRect((this.x-cnvCoor.cx)-this.w/2 , (this.y-cnvCoor.cy)-this.h/2, this.w, this.h)
            }
            stroke(){
                
                ctx.strokeStyle = 'red';
                ctx.strokeRect((this.x-cnvCoor.cx)-this.w/2, (this.y-cnvCoor.cy)-this.h/2, this.w, this.h)
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
                ctx.arc(this.x-cnvCoor.cx, this.y-cnvCoor.cy, this.r, this.sa, this.se, this.cl);
                
                ctx.fill();
                ctx.closePath();
            }
            stroke(){
                ctx.closePath();
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
            return mouse.x > fig.x-fig.r && mouse.x < fig.x + fig.r && mouse.y > fig.y-fig.r && mouse.y < fig.y + fig.r
            }
        }

        setInterval(function() {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (i in fig) {
                fig[i].draw();
        
                if(isInArea(fig[i])){
                   // fig[i].stroke();
                }
            }
            if (selected){
                selected.stroke();
                selected.x = mouse.x 
                selected.y = mouse.y 

            }
            if(selected instanceof Rect){
                if(selected.x + selected.w/2 > this.canvas.width+cnvCoor.cx){
                    selected.x= this.canvas.width + cnvCoor.cx - selected.w/2;
                    selected = false;
                }
                else if(selected.y + selected.h/2 > this.canvas.height + cnvCoor.cy){
                    selected.y = this.canvas.height + cnvCoor.cy - selected.h/2
                    selected = false;
                }
                else if(selected.x - selected.w/2 < cnvCoor.cx){
                    selected.x = selected.w/2 + cnvCoor.cx
                    selected = false;
                }
                else if(selected.y - selected.h/2 < cnvCoor.cy){
                    selected.y = selected.h/2 + cnvCoor.cy;
                    selected = false
                }
            }
            else if (selected instanceof Circle) {
                if(selected.x + selected.r > this.canvas.width + cnvCoor.cx){
                    selected.x= this.canvas.width + cnvCoor.cx - selected.r;
                    selected = false;
                }
                else if(selected.y + selected.r > this.canvas.height + cnvCoor.cy){
                    selected.y = this.canvas.height + cnvCoor.cy - selected.r
                    selected = false;
                }
                else if(selected.x - selected.r < cnvCoor.cx){
                    selected.x = selected.r + cnvCoor.cx
                    selected = false;
                }
                else if(selected.y - selected.r < cnvCoor.cy){
                    selected.y = selected.r + cnvCoor.cy;
                    selected = false
                }
            }
        
            
        },30);

        window.onmousedown = function() {
            if (!selected){
                for (let i=fig.length; i >= 0; i--) {
                    if(isInArea(fig[i])){
                    selected = fig[i];
                    fig.push(...fig.splice(i,1));
                    break
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
export default Canvas


