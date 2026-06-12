import { createProfileFeatureOutletRefresh } from './nested-outlet-refresh';

describe('createProfileFeatureOutletRefresh', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('does not refresh when feature segment stays the same', () => {
    const host = document.createElement('div');
    const outlet = document.createElement('div');
    outlet.className = 'remote-shell__outlet';
    outlet.appendChild(document.createElement('span'));
    host.appendChild(outlet);

    const controller = createProfileFeatureOutletRefresh(
      { url: '/profile/user-info' } as never,
      () => host,
    );

    controller.handleNavigation('/profile/user-info');
    jasmine.clock().tick(0);

    expect(outlet.childNodes.length).toBe(1);
    expect(controller.outletKey()).toBe(1);
  });

  it('purges stale siblings when feature segment changes', () => {
    const host = document.createElement('div');
    const outlet = document.createElement('div');
    outlet.className = 'remote-shell__outlet';
    outlet.appendChild(document.createElement('span'));
    host.appendChild(outlet);

    const controller = createProfileFeatureOutletRefresh(
      { url: '/profile/user-info' } as never,
      () => host,
    );

    controller.handleNavigation('/profile/security');
    jasmine.clock().tick(0);

    expect(outlet.childNodes.length).toBe(0);
    expect(controller.outletKey()).toBe(1);
  });
});
