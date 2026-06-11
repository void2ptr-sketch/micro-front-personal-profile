import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

import { APP_ENVIRONMENT } from '../../../core/config/app-environment.token';

import { THEME_STORAGE_KEY, isAppTheme } from '../theme-registry';
import type { AppTheme } from '../theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly env = inject(APP_ENVIRONMENT);
  private readonly themeSignal = signal<AppTheme>(this.env.contour);
  private readonly contourDefaultSignal = signal(true);

  readonly theme = this.themeSignal.asReadonly();
  readonly isContourDefault = this.contourDefaultSignal.asReadonly();

  initialize(): void {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (stored && isAppTheme(stored)) {
      this.applyTheme(stored, false);
      return;
    }

    this.applyTheme(this.env.contour, true);
  }

  setTheme(theme: AppTheme): void {
    this.applyTheme(theme, false);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  resetToContour(): void {
    localStorage.removeItem(THEME_STORAGE_KEY);
    this.applyTheme(this.env.contour, true);
  }

  private applyTheme(theme: AppTheme, contourDefault: boolean): void {
    this.themeSignal.set(theme);
    this.contourDefaultSignal.set(contourDefault);
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
