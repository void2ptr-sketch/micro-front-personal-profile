import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

import { APP_ENVIRONMENT } from '../../../core/config/app-environment.token';

import { THEME_STORAGE_KEY, isAppTheme } from '../theme-registry';
import type { AppTheme } from '../theme.types';

@Injectable()
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

  resetShellTheme(): void {
    this.document.documentElement.removeAttribute('data-theme');

    for (const shell of this.document.querySelectorAll('app-personal-profile-remote-shell')) {
      shell.removeAttribute('data-theme');
    }
  }

  private applyTheme(theme: AppTheme, contourDefault: boolean): void {
    this.themeSignal.set(theme);
    this.contourDefaultSignal.set(contourDefault);

    const themeTarget = this.resolveThemeTarget();
    themeTarget.setAttribute('data-theme', theme);
    this.clearThemeFromOtherTargets(themeTarget);
  }

  private resolveThemeTarget(): HTMLElement {
    const shell = this.document.querySelector(
      'app-personal-profile-remote-shell:not([aria-hidden="true"])',
    );

    if (shell instanceof HTMLElement) {
      return shell;
    }

    return this.document.documentElement;
  }

  private clearThemeFromOtherTargets(activeTarget: HTMLElement): void {
    const targets = [
      this.document.documentElement,
      ...Array.from(this.document.querySelectorAll('app-personal-profile-remote-shell')),
    ];

    for (const target of targets) {
      if (target instanceof HTMLElement && target !== activeTarget) {
        target.removeAttribute('data-theme');
      }
    }
  }
}
