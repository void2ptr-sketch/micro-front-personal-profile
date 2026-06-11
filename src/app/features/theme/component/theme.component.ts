import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { APP_ENVIRONMENT } from '../../../core/config/app-environment.token';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { THEME_OPTIONS } from '../theme-registry';
import type { AppTheme } from '../theme.types';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, TranslatePipe],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {
  readonly themeService = inject(ThemeService);
  readonly env = inject(APP_ENVIRONMENT);
  readonly themeOptions = THEME_OPTIONS;

  onThemeChange(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }

  resetToContour(): void {
    this.themeService.resetToContour();
  }
}
