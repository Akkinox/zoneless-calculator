import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷', 'x'];
const specialOperators = ['C', '+/-', '.', '%', '=', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value:string):void{
    // Validar el input
    if(![...numbers, ...operators, ...specialOperators].includes(value)){
      console.log('Input invalido:', value);
      return;
    }
    // =
    if(value === '='){
      this.calculateResult();
      return;
    }
    // Limpia resultados
    if(value === 'C'){
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }
    // Borrar ultimo caracter
    if(value === 'Backspace'){
      if(this.resultText() === '0') return;
      if(this.resultText().includes('-') && this.resultText()!.length === 2){
        this.resultText.set('0');
        return;
      }

      if(this.resultText()!.length === 1){
        this.resultText.set('0');
        return;
      }
      this.resultText.update(text => text.slice(0, -1));
      return;
    }

    //Aplicar operador
    if(operators.includes(value)){
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //limitar numero de caracteres
    if(this.resultText()!.length >= 10){
      console.log('Limite de caracteres alcanzado');
      return;
    }

      // Validar punto decimal
    if(value === '.' && !this.resultText().includes('.')){  
      if(this.resultText() === '0' || this.resultText() === ''){
        this.resultText.set('0.');
        return;
      }
      this.resultText.update(text => text + '.');  
      return;
    }

    //Condicionar 0
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')){
      return;
    }

    // Cambiar signo
    if(value === '+/-'){
      if(this.resultText().includes('-')){
        this.resultText.update(text => text.slice(1));
        return;
      } 
      this.resultText.update(text => '-' + text);
      return;
    }

    // Numeros
    if(numbers.includes(value)){
      if(this.resultText() === '0'){
        this.resultText.set(value);
        return;
      }
      if(this.resultText() === '-0'){
        this.resultText.set('-' + value);
        return;
      
      }
      this.resultText.update(text => text + value);
    }
  }

  public calculateResult():void{
    const num1 = parseFloat(this.subResultText());
    const num2 = parseFloat(this.resultText());
    let result: number;

    switch(this.lastOperator()){
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '÷':
      case '/':
        if(num2 === 0){
          console.log('Error: Division por cero');
          this.resultText.set('Error');
          return;
        }
        result = num1 / num2;
        break;
      default:
        console.log('Operador desconocido:', this.lastOperator());
        return;
    }

    this.resultText.set(result.toString().slice(0, 10));
    this.subResultText.set('0');
    this.lastOperator.set('+');
  } 
}
