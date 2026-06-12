import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { APP_ENVIRONMENT } from '../../core/config/app-environment.token';
import { ProfileStateService } from '../../core/state/profile-state.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-user-info',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  readonly env = inject(APP_ENVIRONMENT);
  readonly profileState = inject(ProfileStateService);
}
