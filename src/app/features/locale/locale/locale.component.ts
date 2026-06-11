import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { LOCALE_OPTIONS } from '../../../../locale/locale-registry';
import type { AppLocale } from '../../../../locale/locale.types';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LocaleService } from '../service/locale.service';

@Component({
  selector: 'app-locale',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, TranslatePipe],
  templateUrl: './locale.component.html',
  styleUrl: './locale.component.scss',
})
export class LocaleComponent {
  readonly localeService = inject(LocaleService);
  readonly localeOptions = LOCALE_OPTIONS;

  onLocaleChange(locale: AppLocale): void {
    this.localeService.setLocale(locale);
  }
}
