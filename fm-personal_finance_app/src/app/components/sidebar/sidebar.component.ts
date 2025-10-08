import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: '/overview' },
  { label: 'Transactions', path: '/transactions' },
  { label: 'Budgets', path: '/budgets' },
  { label: 'Pots', path: '/pots' },
  { label: 'Recurring bills', path: '/recurring-bills' }
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  readonly items = NAV_ITEMS;

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
