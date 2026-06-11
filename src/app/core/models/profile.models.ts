import type { PersonalProfile } from '../domain/profile-domain.types';

export type ProfileIdentity = {
  readonly userId: string;
  readonly displayName: string;
};

export const DEMO_PROFILE_IDENTITY: ProfileIdentity = {
  userId: 'demo-user',
  displayName: 'Демо-пользователь',
};

export const createInitialProfile = (): PersonalProfile => ({
  ...DEMO_PROFILE_IDENTITY,
  plugins: [],
});
