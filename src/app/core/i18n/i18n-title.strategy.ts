import { Injectable, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { LocaleService } from '../../features/locale/service/locale.service';

@Injectable()
export class I18nTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly localeService = inject(LocaleService);
  private lastSnapshot: RouterStateSnapshot | null = null;

  constructor() {
    super();

    effect(() => {
      this.localeService.locale();
      if (this.lastSnapshot) {
        this.updateTitle(this.lastSnapshot);
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.lastSnapshot = snapshot;

    const titleKey = this.resolveTitleKey(snapshot);
    if (!titleKey) {
      return;
    }

    this.title.setTitle(this.localeService.translate(titleKey));
  }

  private resolveTitleKey(snapshot: RouterStateSnapshot): string | null {
    let route = snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const titleKey = route.data['titleKey'];
    return typeof titleKey === 'string' ? titleKey : null;
  }
}
