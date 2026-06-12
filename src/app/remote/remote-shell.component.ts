import { Component, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProfileOutletRefreshService } from '../core/routing/profile-outlet-refresh.service';
import { ProfileStateService } from '../core/state/profile-state.service';
import { LOCALE_PLUGIN } from '../features/locale/locale/locale.constants';
import { LocaleService } from '../features/locale/service/locale.service';
import { SECURITY_PLUGIN } from '../features/security/security.constants';
import { THEME_PLUGIN } from '../features/theme/theme.constants';
import { ThemeService } from '../features/theme/service/theme.service';

@Component({
  selector: 'app-personal-profile-remote-shell',
  imports: [RouterOutlet],
  template: `
    <div class="remote-shell__outlet">
      <router-outlet />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 0;
      flex: 1 1 auto;
    }

    .remote-shell__outlet {
      display: flex;
      flex-direction: column;
      min-height: 0;
      flex: 1 1 auto;
    }
  `,
})
export class RemoteShellComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly localeService = inject(LocaleService);
  private readonly profileState = inject(ProfileStateService);
  private readonly outletRefreshService = inject(ProfileOutletRefreshService);
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly outletRefresh = this.outletRefreshService.createController(
    () => this.hostRef.nativeElement,
  );

  ngOnInit(): void {
    this.outletRefreshService.register({
      controller: this.outletRefresh,
      getHostElement: () => this.hostRef.nativeElement,
    });

    this.localeService.initialize();
    this.themeService.initialize();

    void this.profileState.loadInitialProfile().then(() => {
      this.profileState.registerPlugin(SECURITY_PLUGIN);
      this.profileState.registerPlugin(LOCALE_PLUGIN);
      this.profileState.registerPlugin(THEME_PLUGIN);
    });
  }

  ngOnDestroy(): void {
    this.outletRefreshService.unregister(this.outletRefresh);
    this.themeService.resetShellTheme();
  }
}
