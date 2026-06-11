export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type ProfileStateSnapshot = {
  readonly status: AsyncStatus;
  readonly error: string | null;
};
