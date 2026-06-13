import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { APP_ENVIRONMENT } from '../../../core/config/app-environment.token';
import { detachStaleSelectOverlays } from '../../../shared/overlay/detach-stale-select-overlays';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { THEME_OPTIONS } from '../theme-registry';
import type { AppTheme } from '../theme.types';
import { ThemeService } from '../service/theme.service';

const SELECT_PANEL_CLOSE_MS = 300;

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

  onThemeSelection(change: MatSelectChange): void {
    const theme = change.value as AppTheme;
    change.source.close();

    if (theme === this.themeService.theme()) {
      return;
    }

    window.setTimeout(() => {
      this.themeService.setTheme(theme);
      detachStaleSelectOverlays();
    }, SELECT_PANEL_CLOSE_MS);
  }

  resetToContour(): void {
    this.themeService.resetToContour();
  }
}
