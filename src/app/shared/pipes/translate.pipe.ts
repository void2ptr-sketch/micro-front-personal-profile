import { Pipe, PipeTransform, inject } from '@angular/core';

import { LocaleService } from '../../features/locale/service/locale.service';

@Pipe({
  name: 't',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly localeService = inject(LocaleService);

  transform(key: string, params?: Record<string, string>): string {
    this.localeService.revision();
    return this.localeService.translate(key, params);
  }
}
