import { Injectable, SecurityContext, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export type SanitizeTextOptions = {
  readonly maxLength: number;
};

export type SanitizePasswordOptions = {
  readonly maxLength: number;
};

const DEFAULT_TEXT_OPTIONS: SanitizeTextOptions = { maxLength: 256 };
const DEFAULT_PASSWORD_OPTIONS: SanitizePasswordOptions = { maxLength: 128 };

@Injectable()
export class InputSanitizerService {
  private readonly sanitizer = inject(DomSanitizer);

  sanitizeText(value: string, options: SanitizeTextOptions = DEFAULT_TEXT_OPTIONS): string {
    const withoutHtml = this.sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
    return this.removeControlCharacters(withoutHtml).trim().slice(0, options.maxLength);
  }

  sanitizePassword(
    value: string,
    options: SanitizePasswordOptions = DEFAULT_PASSWORD_OPTIONS,
  ): string {
    return this.removeControlCharacters(value).slice(0, options.maxLength);
  }

  private removeControlCharacters(value: string): string {
    return [...value]
      .filter((char) => {
        const code = char.charCodeAt(0);
        return code > 31 && code !== 127;
      })
      .join('');
  }
}
