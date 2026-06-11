import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

import { DEFAULT_NAV_ITEMS } from '../../config/nav-items';

@Component({
  selector: 'app-navigation',
  imports: [MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly navItems = DEFAULT_NAV_ITEMS;
}
