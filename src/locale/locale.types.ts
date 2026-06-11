export type AppLocale = 'ru' | 'zh' | 'en';

export type LocaleMessages = Record<string, string>;

export type LocaleOption = {
  readonly id: AppLocale;
  readonly label: string;
};
