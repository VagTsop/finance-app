import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceDataService } from '../../services/finance-data.service';
import { currency } from '../../utilities/formatters';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./budgets.component.css'],
  templateUrl: './budgets.component.html'
})
export class BudgetsComponent {
  private readonly data = inject(FinanceDataService);

  readonly budgets = this.data.budgets;

  formatCurrency(value: number): string {
    return currency(value);
  }
}
