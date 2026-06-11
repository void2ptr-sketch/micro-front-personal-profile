import { Injectable, computed, signal } from '@angular/core';

import type { PersonalProfile, ProfilePlugin } from '../domain/profile-domain.types';
import { createInitialProfile } from '../models/profile.models';

import type { AsyncStatus } from './profile-state.types';

@Injectable({ providedIn: 'root' })
export class ProfileStateService {
  private readonly statusSignal = signal<AsyncStatus>('idle');
  private readonly profileSignal = signal<PersonalProfile | null>(null);
  private readonly errorSignal = signal<string | null>(null);

  readonly status = this.statusSignal.asReadonly();
  readonly profile = this.profileSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly displayName = computed(() => this.profileSignal()?.displayName ?? '');
  readonly plugins = computed(() => this.profileSignal()?.plugins ?? []);
  readonly isLoading = computed(() => this.statusSignal() === 'loading');
  readonly hasError = computed(() => this.statusSignal() === 'error');

  loadInitialProfile(): void {
    if (this.statusSignal() !== 'idle') {
      return;
    }

    this.setLoading();

    // Синхронная инициализация; HTTP-потоки подключим в разделе «API и данные»
    this.setProfile(createInitialProfile());
  }

  setProfile(profile: PersonalProfile): void {
    this.profileSignal.set(profile);
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
      return;
    }

    const isDuplicate = current.plugins.some((item) => item.id === plugin.id);
    if (isDuplicate) {
      return;
    }

    this.profileSignal.set({
      ...current,
      plugins: [...current.plugins, plugin],
    });
  }
}
