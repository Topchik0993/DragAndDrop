import React,{useRef, useState, useEffect, Component} from "react";
import {Canvas} from "./canvas/canvas";


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
      <button type="button" value="circle" id="circle" className="circle" > </button>
      <div>
      <button type="button" value="rect" id="rect" className="rect" ></button>
      </div>
    </div>
    <Canvas/>
  </div>
 
</div>)
}

export default App;
