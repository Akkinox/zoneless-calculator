import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/CalculatorService';

@Component({
  selector: 'calculator-component',
  imports: [CalculatorButton],
  templateUrl: './CalculatorComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // styles: `
  //   @reference "tailwindcss";
  //   .is-command {
  //     @apply bg-indigo-700/20 ;
  //   }
  // `,
  host: {
    '(document:keyup)' : 'handleKeyboardEvent($event)' 
  }
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButton);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    // console.log({key});
    this.calculatorService.constructNumber(key);
  }

  // Funcion para detectart las teclas que presiona el usuario
  // @HostListener('document:keyup', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents:Record<string, string> = {
      Escape: 'C',
      Enter: '=',
      '+': '+',
      '-': '-',
      'x': '*',
      '÷': '/',
      '.': '.'
    }
    const key = event.key;
    const mappedKey = keyEquivalents[key] ?? key;
    this.handleClick(mappedKey);
    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(mappedKey);
    });
  }
}
