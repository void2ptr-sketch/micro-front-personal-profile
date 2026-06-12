import type { AppLocale, LocaleMessages, LocaleOption } from './locale.types';
import { EN_MESSAGES } from './messages.en';
import { RU_MESSAGES } from './messages.ru';
import { ZH_MESSAGES } from './messages.zh';

export const LOCALE_STORAGE_KEY = 'personal-profile.locale';

export const LOCALE_MESSAGES: Record<AppLocale, LocaleMessages> = {
  ru: RU_MESSAGES,
  zh: ZH_MESSAGES,
  en: EN_MESSAGES,
};

export const SUPPORTED_LOCALES: readonly AppLocale[] = ['ru', 'zh', 'en'];

export const LOCALE_OPTIONS: readonly LocaleOption[] = [
  { id: 'ru', label: RU_MESSAGES['locale.option.ru'] },
  { id: 'zh', label: ZH_MESSAGES['locale.option.zh'] },
  { id: 'en', label: EN_MESSAGES['locale.option.en'] },
];

export const isAppLocale = (value: string): value is AppLocale =>
  SUPPORTED_LOCALES.includes(value as AppLocale);
