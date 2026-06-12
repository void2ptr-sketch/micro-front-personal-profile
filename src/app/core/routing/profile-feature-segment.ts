export type ProfileFeatureSegment = 'user-info' | 'security' | 'locale' | 'theme';

export const resolveProfileFeatureSegment = (url: string): ProfileFeatureSegment => {
  const path = url.split('?')[0]?.split('#')[0] ?? '';
  const segments = path.split('/').filter(Boolean);
  const profileIndex = segments.indexOf('profile');
  const feature = profileIndex >= 0 ? segments[profileIndex + 1] : segments[0];

  if (feature === 'security' || feature === 'locale' || feature === 'theme') {
    return feature;
  }

  return 'user-info';
};
