import { Component, inject } from '@angular/core';

import { APP_ENVIRONMENT } from '../../config/app-environment.token';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly env = inject(APP_ENVIRONMENT);
  readonly year = new Date().getFullYear();
}
