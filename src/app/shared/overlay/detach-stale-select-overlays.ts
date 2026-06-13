/** Host federation may leave mat-select panels stuck in exit animation. */
export const detachStaleSelectOverlays = (documentRef: Document = document): void => {
  for (const panel of documentRef.querySelectorAll('.mat-mdc-select-panel, .mat-select-panel-exit')) {
    panel.closest('.cdk-overlay-pane')?.remove();
  }

  for (const backdrop of documentRef.querySelectorAll('.cdk-overlay-backdrop')) {
    backdrop.remove();
  }
};
