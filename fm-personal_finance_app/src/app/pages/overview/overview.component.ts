import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceDataService } from '../../services/finance-data.service';
import { currency } from '../../utilities/formatters';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./overview.component.css'],
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  private readonly data = inject(FinanceDataService);

  readonly balance = this.data.balance;
  readonly budgets = computed(() => this.data.budgets().slice(0, 3));
  readonly pots = computed(() => this.data.pots().slice(0, 3));
  readonly recentTransactions = computed(() => this.data.getRecentTransactions(5));
  readonly recurringTotal = computed(() => this.data.getTotalRecurring());
  readonly recurringBills = computed(() => this.data.recurringBills().slice(0, 5));
  readonly categoryTotals = computed(() => this.data.getCategoryTotals().slice(0, 5));

  formatCurrency(value: number): string {
    return currency(value);
  }
}
