import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceDataService } from '../../services/finance-data.service';
import { currency, formatDate } from '../../utilities/formatters';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./transactions.component.css'],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent {
  private readonly data = inject(FinanceDataService);

  readonly transactions = this.data.transactions;

  formatCurrency(value: number): string {
    return currency(value);
  }

  formatDate(value: string): string {
    return formatDate(value);
  }
}
