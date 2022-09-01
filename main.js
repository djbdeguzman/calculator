const numberButton = document.getElementsByClassName('btn_number');
const operationButton = document.getElementsByClassName('btn_operation');
const button = document.getElementsByClassName('btn');
const display = document.querySelector('.display-bottom');
const displayTop = document.querySelector('.display-top');
//constant variable used for power button
const power = document.querySelector('.btn_power');
const disabledButton = document.querySelector('.btn_power');

// variables
let num1 = undefined;
let num2 = undefined;
let operation = undefined;
let getResultReady = false;
let result = undefined;
let previousOperation;
let powerState = false;

Array.from(numberButton).forEach(key =>
  key.addEventListener('click',function(showValue){
    if(powerState == false){
      return;
    } else {
      if(previousOperation == "=") {
        return;
      } else {
        display.textContent += showValue.target.textContent;
      }
    }
  }));

Array.from(operationButton).forEach(key =>
  key.addEventListener('click',function(getOperation){
    operationUsed = getOperation.target.textContent;
    // console.log(operationUsed)
    
    if(operationUsed == "AC") {
      ac();
    } else if(operationUsed == "C") {
      c();
    } else if(operationUsed == "ON") {
      power(operationUsed);
    } else if(operationUsed == "+/-") {
      display.textContent = -(display.textContent);
    } else if(operationUsed == ".") {
      if(display.textContent.includes('.') == true) {
        return;
      } else {
        display.textContent += ".";
      }
    } 
    
    //if display == 0 or empty string, these buttons will work
    if (display.textContent == 0 || display.textContent == "") {
      return;
    } else {
        if (operationUsed == "+") { // operation addition
          num1 = Number(display.textContent);
          getResultReady = true;
          operation = "+";
          opDefault();
        } else if (operationUsed == "-") { // operation subtract
          num1 = Number(display.textContent);
          getResultReady = true;
          operation = "-";
          
          opDefault();
        } else if (operationUsed == "/") { // operation divide
          num1 = Number(display.textContent);
          getResultReady = true;
          operation = "/";
          opDefault();
        } else if (operationUsed == "x") { // operation multiply
          num1 = Number(display.textContent);
          getResultReady = true;
          operation = "*";
          opDefault();
        }
      } 
      if (operationUsed == "=") { // equal button
        num2 = Number(display.textContent);
        if ( operation == "") { // equal button will not work if operation is not equal to +-/*
          return; 
        } else {
          if(getResultReady = true) {
            if(num1 == undefined) {
              /* console.log("num1 is not ready") */
            } else {
              /* console.log("num1 is "+num1, "num2 is "+num2, getResultReady, operation); */
              displayTop.textContent = num1 + " " + operation + " " + num2 + "=";
              getResult(operation);
              operation = undefined; // operation should back back to default
              previousOperation ="=";
            }
          }
        }
      }
  }));

  function getResult(operation) {
    num1 = num1;
    num2 = num2;
    if (operation == "+") {
      result = num1+num2;
      num1 = result;
      display.textContent = result
      
    } 
    if (operation == "-") {
      result = num1-num2;
      num1 = result;
      display.textContent = result
      
    } 
    if (operation == "/") {
      result = num1/num2;
      num1 = result;
      display.textContent = result.toFixed(2)
      
    } 
    if (operation == "*") {
      result = num1*num2;
      num1 = result;
      display.textContent = result
    } 
    num2 = undefined;
    
    return result;
  }

  function ac() {
    num1 = undefined;
    num2 = undefined;
    operation = undefined;
    previousOperation = undefined;
    getResultReady = false;
    result = undefined;
    display.textContent = "";
    displayTop.textContent = "";
  }
  
  function c() {
    display.textContent = "";
  }

  function opDefault() {
    previousOperation = "";
    display.textContent = "";
    displayTop.textContent = (num1 + " " + operation);
  }
  function calculatorPowerButton() {
    if (powerState == true) {
      num1 = undefined;
      num2 = undefined;
      operation = undefined;
      previousOperation = undefined;
      getResultReady = false;
      result = undefined
      powerState = false
      display.textContent ="";
      displayTop.textContent ="";
      power.textContent = "ON"
      power.classList.remove("calculator_ON");
    } else {
      powerState = true
      power.textContent = "OFF"
      power.classList.add("calculator_ON");
    }
  }