import React from "react";

import "./index.css"

export default function Button(props) {
   return(
      <button 
         className={`button
            ${props.operator ? "operation" : ""}
            ${props.double ? "double" : ""}
            ${props.triple ? "triple" : ""}
         `}
         onClick={e => props.click(props.label)}
      >
         {props.label}
      </button>
   );
   
}