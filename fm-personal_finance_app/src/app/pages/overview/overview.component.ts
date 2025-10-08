import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FinanceDataService } from '../../services/finance-data.service';
import { BudgetSummary } from '../../models';
import { currency } from '../../utilities/formatters';

interface BudgetHighlight extends BudgetSummary {
  share: number;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./overview.component.css'],
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  private readonly data = inject(FinanceDataService);

  readonly balance = this.data.balance;
  private readonly potsSignal = this.data.pots;
  private readonly budgetsSignal = this.data.budgets;

  readonly topPots = computed(() => this.potsSignal().slice(0, 3));

  readonly potsSummary = computed(() => {
    const pots = this.potsSignal();
    const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);
    const totalTarget = pots.reduce((sum, pot) => sum + pot.target, 0);
    const progress = totalTarget === 0 ? 0 : Math.round((totalSaved / totalTarget) * 100);

    return {
      totalSaved,
      totalTarget,
      progress
    };
  });

  readonly budgetHighlights = computed(() => {
    const budgets = this.budgetsSignal();
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const totalMaximum = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

    const items: BudgetHighlight[] = [];
    const segments: string[] = [];
    let cursor = 0;

    for (const budget of budgets) {
      const share = totalSpent <= 0 ? 0 : (budget.spent / totalSpent) * 100;
      const start = cursor;
      cursor += share;

      segments.push(`${budget.theme} ${start}% ${cursor}%`);
      items.push({ ...budget, share: Math.round(share) });
    }

    const gradient =
      totalSpent <= 0 || !segments.length
        ? 'conic-gradient(#d3cdc4 0deg 360deg)'
        : `conic-gradient(${segments.join(', ')})`;

    return {
      totalSpent,
      totalMaximum,
      remaining: Math.max(0, totalMaximum - totalSpent),
      gradient,
      items
    };
  });

  readonly recentTransactions = computed(() => this.data.getRecentTransactions(5));
  readonly recurringBills = computed(() => this.data.recurringBills().slice(0, 5));
  readonly recurringTotal = computed(() => this.data.getTotalRecurring());

  formatCurrency(value: number): string {
    return currency(value);
  }
}
