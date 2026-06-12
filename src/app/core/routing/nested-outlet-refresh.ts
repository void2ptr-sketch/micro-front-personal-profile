import { signal, type WritableSignal } from '@angular/core';
import type { Router } from '@angular/router';

import {
  resolveProfileFeatureSegment,
  type ProfileFeatureSegment,
} from './profile-feature-segment';
import { purgeRouterOutletSiblings } from './purge-router-outlet-siblings';

export type NestedOutletRefreshController = {
  outletKey: WritableSignal<number>;
  handleNavigation: (url: string) => void;
};

export const createProfileFeatureOutletRefresh = (
  router: Router,
  getHostElement: () => HTMLElement,
): NestedOutletRefreshController => {
  const outletKey = signal(1);
  let activeFeature: ProfileFeatureSegment = resolveProfileFeatureSegment(router.url);
  let purgeToken = 0;

  const purgeContentHost = (): void => {
    const host = getHostElement();
    const outlet = host.querySelector('.remote-shell__outlet');

    if (outlet instanceof HTMLElement) {
      purgeRouterOutletSiblings(outlet);
      return;
    }

    purgeRouterOutletSiblings(host, ['personal-profile-remote-shell']);
  };

  const schedulePurge = (): void => {
    const token = ++purgeToken;

    window.setTimeout(() => {
      if (token !== purgeToken) {
        return;
      }

      purgeContentHost();

      window.requestAnimationFrame(() => {
        if (token !== purgeToken) {
          return;
        }

        purgeContentHost();
      });
    }, 0);
  };

  return {
    outletKey,
    handleNavigation: (url: string): void => {
      const nextFeature = resolveProfileFeatureSegment(url);
      if (nextFeature === activeFeature) {
        return;
      }

      activeFeature = nextFeature;
      schedulePurge();
    },
  };
};
