import { CalculatorComponent } from '@/calculator/components/CalculatorComponent/CalculatorComponent';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorView { }
