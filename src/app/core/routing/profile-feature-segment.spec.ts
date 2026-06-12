import { resolveProfileFeatureSegment } from './profile-feature-segment';

describe('resolveProfileFeatureSegment', () => {
  it('resolves standalone feature paths', () => {
    expect(resolveProfileFeatureSegment('/user-info')).toBe('user-info');
    expect(resolveProfileFeatureSegment('/security')).toBe('security');
    expect(resolveProfileFeatureSegment('/locale')).toBe('locale');
    expect(resolveProfileFeatureSegment('/theme')).toBe('theme');
  });

  it('resolves shell remote feature paths', () => {
    expect(resolveProfileFeatureSegment('/profile/user-info')).toBe('user-info');
    expect(resolveProfileFeatureSegment('/profile/security')).toBe('security');
    expect(resolveProfileFeatureSegment('/profile/locale')).toBe('locale');
    expect(resolveProfileFeatureSegment('/profile/theme')).toBe('theme');
  });
});
