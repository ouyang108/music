export const useClient = (cb: () => void) => {
  if (import.meta.client) {
    cb();
  }
};
