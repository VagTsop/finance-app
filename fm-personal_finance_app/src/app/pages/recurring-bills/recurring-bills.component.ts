import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceDataService } from '../../services/finance-data.service';
import { currency, formatDate } from '../../utilities/formatters';

@Component({
  selector: 'app-recurring-bills',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./recurring-bills.component.css'],
  templateUrl: './recurring-bills.component.html'
})
export class RecurringBillsComponent {
  private readonly data = inject(FinanceDataService);

  readonly bills = this.data.recurringBills;
  readonly total = this.data.getTotalRecurring();

  formatCurrency(value: number): string {
    return currency(value);
  }

  formatDate(value: string): string {
    return formatDate(value);
  }
}
