import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ApiClientError } from '../api/api-client.error';
import { ProfileApiService } from '../api/services/profile-api.service';
import type { PersonalProfile, ProfilePlugin } from '../domain/profile-domain.types';
import { LocaleService } from '../../features/locale/service/locale.service';

import type { AsyncStatus } from './profile-state.types';

@Injectable()
export class ProfileStateService {
  private readonly profileApi = inject(ProfileApiService);
  private readonly localeService = inject(LocaleService);
  private readonly statusSignal = signal<AsyncStatus>('idle');
  private readonly profileSignal = signal<PersonalProfile | null>(null);
  private readonly errorSignal = signal<string | null>(null);
  private readonly pendingPluginsSignal = signal<readonly ProfilePlugin[]>([]);
  private loadingPromise: Promise<void> | null = null;

  readonly status = this.statusSignal.asReadonly();
  readonly profile = this.profileSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly displayName = computed(() => this.profileSignal()?.displayName ?? '');
  readonly plugins = computed(() => this.profileSignal()?.plugins ?? []);
  readonly isLoading = computed(() => this.statusSignal() === 'loading');
  readonly hasError = computed(() => this.statusSignal() === 'error');

  loadInitialProfile(): Promise<void> {
    if (this.statusSignal() === 'success') {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.setLoading();

    this.loadingPromise = firstValueFrom(this.profileApi.getProfile())
      .then((response) => {
        this.setProfile(response.data);
      })
      .catch((error: unknown) => {
        const message =
          error instanceof ApiClientError
            ? error.message
            : this.localeService.translate('api.error.unknown');
        this.setError(message);
      })
      .finally(() => {
        this.loadingPromise = null;
      });

    return this.loadingPromise;
  }

  setProfile(profile: PersonalProfile): void {
    this.profileSignal.set({
      ...profile,
      plugins: this.mergePlugins(profile.plugins, this.pendingPluginsSignal()),
    });
    this.pendingPluginsSignal.set([]);
    this.statusSignal.set('success');
    this.errorSignal.set(null);
  }

  setLoading(): void {
    this.statusSignal.set('loading');
    this.errorSignal.set(null);
  }

  setError(message: string): void {
    this.statusSignal.set('error');
    this.errorSignal.set(message);
  }

  registerPlugin(plugin: ProfilePlugin): void {
    const current = this.profileSignal();

    if (!current) {
      this.pendingPluginsSignal.update((pending) => this.mergePlugins(pending, [plugin]));
      return;
    }

    if (current.plugins.some((item) => item.id === plugin.id)) {
      return;
    }

    this.profileSignal.set({
      ...current,
      plugins: [...current.plugins, plugin],
    });
  }

  private mergePlugins(
    base: readonly ProfilePlugin[],
    extra: readonly ProfilePlugin[],
  ): ProfilePlugin[] {
    const merged = [...base];

    for (const plugin of extra) {
      if (!merged.some((item) => item.id === plugin.id)) {
        merged.push(plugin);
      }
    }

    return merged;
  }
}
