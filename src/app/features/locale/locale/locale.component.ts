import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { LOCALE_OPTIONS } from '../../../../locale/locale-registry';
import type { AppLocale } from '../../../../locale/locale.types';
import { detachStaleSelectOverlays } from '../../../shared/overlay/detach-stale-select-overlays';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LocaleService } from '../service/locale.service';

const SELECT_PANEL_CLOSE_MS = 300;

@Component({
  selector: 'app-locale',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, TranslatePipe],
  templateUrl: './locale.component.html',
  styleUrl: './locale.component.scss',
})
export class LocaleComponent {
  readonly localeService = inject(LocaleService);
  readonly localeOptions = LOCALE_OPTIONS;

  onLocaleSelection(change: MatSelectChange): void {
    const locale = change.value as AppLocale;
    change.source.close();

    if (locale === this.localeService.locale()) {
      return;
    }

    window.setTimeout(() => {
      this.localeService.setLocale(locale);
      detachStaleSelectOverlays();
    }, SELECT_PANEL_CLOSE_MS);
  }
}
