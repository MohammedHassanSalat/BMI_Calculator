import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'BMI';

  height = new FormControl<number | null>(null);
  weight = new FormControl<number | null>(null);
  result: number | string = 'N/A';
  status: string = 'Invalid input';

  constructor() {
    this.height.valueChanges.subscribe(() => this.calculateBMI());
    this.weight.valueChanges.subscribe(() => this.calculateBMI());
  }

  calculateBMI() {
    const height = this.height.value ? this.height.value / 100 : 0;
    const weight = this.weight.value || 0;

    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height);
      this.result = bmi.toFixed(2);
      this.calculateStatus(bmi);
    }
    else {
      this.result = 'N/A';
      this.status = 'invalid input'
    }
  }

  calculateStatus(bmi: number) {
    if (bmi < 18.5) this.status = 'UnderWeight';
    if (bmi < 25) this.status = 'Normal';
    if (bmi < 30) this.status = 'Overweight';
    return 'Obese';
  }
}
