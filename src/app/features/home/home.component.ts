import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { APP_ENVIRONMENT } from '../../core/config/app-environment.token';
import { ProfileStateService } from '../../core/state/profile-state.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly env = inject(APP_ENVIRONMENT);
  readonly profileState = inject(ProfileStateService);
}
