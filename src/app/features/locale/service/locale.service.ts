import { Injectable, computed, signal } from '@angular/core';
import { loadTranslations } from '@angular/localize';

import {
  LOCALE_MESSAGES,
  LOCALE_STORAGE_KEY,
  isAppLocale,
} from '../../../../locale/locale-registry';
import type { AppLocale } from '../../../../locale/locale.types';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly localeSignal = signal<AppLocale>('ru');
  private readonly autoDetectedSignal = signal(false);
  private readonly revisionSignal = signal(0);

  readonly locale = this.localeSignal.asReadonly();
  readonly isAutoDetected = this.autoDetectedSignal.asReadonly();
  readonly revision = this.revisionSignal.asReadonly();

  readonly messages = computed(() => LOCALE_MESSAGES[this.localeSignal()]);

  initialize(): void {
    const { locale, autoDetected } = this.resolveInitialLocale();
    this.applyLocale(locale, autoDetected);
  }

  setLocale(locale: AppLocale): void {
    this.applyLocale(locale, false);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }

  translate(key: string, params?: Record<string, string>): string {
    const template = this.messages()[key] ?? key;

    if (!params) {
      return template;
    }

    return Object.entries(params).reduce(
      (result, [name, value]) => result.replace(`{$${name}}`, value),
      template,
    );
  }

  private resolveInitialLocale(): { locale: AppLocale; autoDetected: boolean } {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isAppLocale(stored)) {
      return { locale: stored, autoDetected: false };
    }

    const browserLocale = navigator.language.toLowerCase();
    if (browserLocale.startsWith('zh')) {
      return { locale: 'zh', autoDetected: true };
    }

    if (browserLocale.startsWith('en')) {
      return { locale: 'en', autoDetected: true };
    }

    if (browserLocale.startsWith('ru')) {
      return { locale: 'ru', autoDetected: true };
    }

    return { locale: 'ru', autoDetected: true };
  }

  private applyLocale(locale: AppLocale, autoDetected: boolean): void {
    this.localeSignal.set(locale);
    this.autoDetectedSignal.set(autoDetected);
    loadTranslations(LOCALE_MESSAGES[locale]);
    this.revisionSignal.update((value) => value + 1);
  }
}
