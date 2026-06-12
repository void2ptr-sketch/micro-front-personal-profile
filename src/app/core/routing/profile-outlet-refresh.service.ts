import { inject, Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import {
  createProfileFeatureOutletRefresh,
  type NestedOutletRefreshController,
} from './nested-outlet-refresh';

type ProfileOutletRefreshRegistration = {
  controller: NestedOutletRefreshController;
  getHostElement: () => HTMLElement;
};

@Injectable({ providedIn: 'root' })
export class ProfileOutletRefreshService implements OnDestroy {
  private readonly router = inject(Router);
  private activeRegistration: ProfileOutletRefreshRegistration | null = null;

  private readonly navigationSubscription = this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event) => {
      this.activeRegistration?.controller.handleNavigation(event.urlAfterRedirects);
    });

  createController(getHostElement: () => HTMLElement): NestedOutletRefreshController {
    return createProfileFeatureOutletRefresh(this.router, getHostElement);
  }

  register(registration: ProfileOutletRefreshRegistration): void {
    this.activeRegistration = registration;
  }

  unregister(controller: NestedOutletRefreshController): void {
    if (this.activeRegistration?.controller === controller) {
      this.activeRegistration = null;
    }
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
}
