import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  styleUrls: ['./layout.component.css'],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}
