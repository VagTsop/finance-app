import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceDataService } from '../../services/finance-data.service';
import { currency } from '../../utilities/formatters';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./pots.component.css'],
  templateUrl: './pots.component.html'
})
export class PotsComponent {
  private readonly data = inject(FinanceDataService);

  readonly pots = this.data.pots;

  formatCurrency(value: number): string {
    return currency(value);
  }
}
