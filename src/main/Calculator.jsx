import React, { Component } from "react";
import Button from "../Components/Button";
import Display from "../Components/Display";

import "./Calculator.css";

const initialState = {
   displayValue: "0",
   clearDisplay: false,
   operation: null,
   values: [0, 0],
   current: 0
}

export default class Calculator extends Component {

   state = { ...initialState };

   constructor(props) {
      super(props);

      this.clearMemory = this.clearMemory.bind(this);
      this.addDigit = this.addDigit.bind(this);
      this.deleteLastDigit = this.deleteLastDigit.bind(this);  
      this.setOperation = this.setOperation.bind(this);
   }

   clearMemory() {
      this.setState({...initialState});
   }

   setOperation(operation) {
      if (this.state.current === 0){
         this.setState({displayValue: "", operation, current: 1, clearDisplay: true});
      }
      else {
         const equals = operation === "=";
         const currentOperation = this.state.operation;
         
         const values = [...this.state.values];
         switch (currentOperation) {
            case "+": {
               values[0] = values[0] + values[1];
               break;
            }
            case "-": {
               values[0] = values[0] - values[1];
               break;
            }
            case "*": {
               values[0] = values[0] * values[1];
               break;
            }
            case "/": {
               values[0] = values[0] / values[1];
               break;
            }
            default: break;
         }
         values[1] = 0;

         this.setState({
            displayValue: equals ? values[0].toString() : "",
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: true,
            values
         })
      }
   }

   setValue(displayValue){
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({values})
   }

   addDigit(n) {
      if (n === "." && this.state.displayValue.includes("."))
         return
      
      const clearDisplay = this.state.displayValue === "0" || 
         this.state.clearDisplay;
      
      const currentValue = clearDisplay ? "" : this.state.displayValue;
      const displayValue =  currentValue + n;

      this.setState({ displayValue, clearDisplay: false})

      if(n!=="."){
         this.setValue(displayValue)
      }
   }

   deleteLastDigit(){
      let displayValue = "0";
      console.log(this.state.displayValue.length, this.state.displayValue);
      if(this.state.displayValue.length === 1 || this.state.displayValue === "0")
         this.setState({displayValue});
      else {
         displayValue = this.state.displayValue.slice(0, -1);
         this.setState({displayValue});
      }
      
      this.setValue(displayValue);
   }

   render(){
      return(
         <div className="container">
            <Display 
                  previousValue={this.state.current===1 ? this.state.values[0] : ""} 
                  operation={this.state.current===1 ? this.state.operation : ""} 
                  value={this.state.displayValue} 
               />
            <Button operator double label="AC" click={this.clearMemory}/>
            <Button operator label="DEL" click={this.deleteLastDigit}/>
            <Button operator label="/" click={this.setOperation}/>
            <Button label="7" click={this.addDigit}/>
            <Button label="8" click={this.addDigit}/>
            <Button label="9" click={this.addDigit}/>
            <Button operator label="*" click={this.setOperation}/>
            <Button label="4" click={this.addDigit}/>
            <Button label="5" click={this.addDigit}/>
            <Button label="6" click={this.addDigit}/>
            <Button operator label="-" click={this.setOperation}/>
            <Button label="1" click={this.addDigit}/>
            <Button label="2" click={this.addDigit}/>
            <Button label="3" click={this.addDigit}/>
            <Button operator label="+" click={this.setOperation}/>
            <Button double label="0" click={this.addDigit}/>
            <Button label="." click={this.addDigit}/>
            <Button operator label="=" click={this.setOperation}/>
         </div>
      );
   }
}
