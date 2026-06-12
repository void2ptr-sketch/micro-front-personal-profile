import { purgeRouterOutletSiblings } from './purge-router-outlet-siblings';

describe('purgeRouterOutletSiblings', () => {
  it('removes sibling nodes but keeps router-outlet and the latest allowed host', () => {
    const container = document.createElement('div');
    const outlet = document.createElement('router-outlet');
    const staleShell = document.createElement('app-personal-profile-remote-shell');
    const currentShell = document.createElement('app-personal-profile-remote-shell');
    const stale = document.createElement('app-security-component');

    container.append(outlet, staleShell, currentShell, stale);
    purgeRouterOutletSiblings(container, ['personal-profile-remote-shell']);

    expect(container.childNodes.length).toBe(3);
    expect(container.contains(outlet)).toBeTrue();
    expect(container.contains(staleShell)).toBeTrue();
    expect(staleShell.style.display).toBe('none');
    expect(staleShell.getAttribute('aria-hidden')).toBe('true');
    expect(container.contains(currentShell)).toBeTrue();
    expect(currentShell.style.display).toBe('');
    expect(container.contains(stale)).toBeFalse();
  });
});
