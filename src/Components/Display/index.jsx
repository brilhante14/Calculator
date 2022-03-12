import React from "react";

import "./index.css";

export default function Display(props) {
   return(
      <div className="display">
         <div className="previous">
            <p className="previousText">{props.previousValue} {props.operation}</p>
         </div>
         <div className="current">{props.value}</div>
         
      </div>
   )
}