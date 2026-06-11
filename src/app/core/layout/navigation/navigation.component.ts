import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { NavigationStateService } from '../../state/navigation-state.service';

@Component({
  selector: 'app-navigation',
  imports: [MatListModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly navigationState = inject(NavigationStateService);

  readonly navItems = this.navigationState.navItems;
}
