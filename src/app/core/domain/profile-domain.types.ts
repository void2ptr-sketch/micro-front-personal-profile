export type AppContour = 'local' | 'dev' | 'test' | 'lt' | 'preprod' | 'prod';

export type ProfilePlugin = {
  readonly id: string;
  readonly name: string;
  readonly routePath: string;
  readonly labelKey: string;
};

export type PersonalProfile = {
  readonly userId: string;
  readonly displayName: string;
  readonly plugins: readonly ProfilePlugin[];
};

export type NavItem = {
  readonly label: string;
  readonly path: string;
  readonly labelKey: string;
};
