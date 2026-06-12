/** Federation may mount routed views as siblings of router-outlet; remove stale nodes. */
export const purgeRouterOutletSiblings = (
  container: HTMLElement,
  keepHostTags: readonly string[] = [],
): void => {
  const keptHostNodes: HTMLElement[] = [];
  const nodesToRemove: ChildNode[] = [];

  for (const node of Array.from(container.childNodes)) {
    if (node.nodeName.toLowerCase() === 'router-outlet') {
      continue;
    }

    if (node instanceof HTMLElement && keepHostTags.length > 0) {
      const tag = node.tagName.toLowerCase();
      if (keepHostTags.some((hostTag) => tag.includes(hostTag))) {
        keptHostNodes.push(node);
        continue;
      }
    }

    nodesToRemove.push(node);
  }

  for (const node of nodesToRemove) {
    container.removeChild(node);
  }

  for (const staleShell of keptHostNodes.slice(0, -1)) {
    staleShell.style.display = 'none';
    staleShell.setAttribute('aria-hidden', 'true');
  }

  const activeShell = keptHostNodes.at(-1);
  if (activeShell instanceof HTMLElement) {
    activeShell.style.removeProperty('display');
    activeShell.removeAttribute('aria-hidden');
  }
};
