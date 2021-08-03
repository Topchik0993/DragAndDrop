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
    ifOnCanvas: false
};
var rectS = {
    w: 280,
    h: 120
};

class Canvas extends Component {
    componentDidMount(){
      const ctx = this.canvas.getContext('2d');
      let rect = document.getElementById('rect'),
          circ = document.getElementById('circle'),        
          cnv = document.getElementById('canvas'),
          isRect = false,
          isPressed = false;
      
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
            ctx.fillStyle = isRect? 'green':'blue';
           isRect? ctx.fillRect((mouse.x - 382) - rectS.w/2 ,(mouse.y - 122) - rectS.h/2, rectS.w, rectS.h):
           ctx.arc(mouse.x - 382, mouse.y - 122, 50,0, 2*Math.PI,0);
           ctx.fill();
           ctx.closePath();
           isPressed = false;
           
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
    console.log(mouse.y)
};

function klack(){
}
export { Canvas, klack}