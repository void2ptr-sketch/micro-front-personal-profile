import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { APP_ENVIRONMENT } from '../../config/app-environment.token';
import { ProfileStateService } from '../../state/profile-state.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly env = inject(APP_ENVIRONMENT);
  readonly profileState = inject(ProfileStateService);
}
