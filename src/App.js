import React from "react";
import go from "./canvas/canvas";


const styles = {
  canvas:{
    width: '1440px',
    heihgt: '500px',
    outline: '1px solid',
    backgroundColor: 'beige'
  }
}

function App() {
  return (
<div>
  <div className="wrapper">
    <div className="fig">
      <h1>Figures</h1>   
    </div>
    <div className="canv"> 
      <h1 align="center">Canvas</h1>
    </div> 
  </div>
  <div className="content">
    <div className="obj">
      <button type="button" id="circle" className="circle" onClick={go}> </button>
      <div>
      <button type="button" id="rect" className="rect" onClick={go}></button>
      </div>
    </div>
    <canvas id="myCanvas" style={styles.canvas}></canvas>
  </div>
</div>)
}

export default App;
