export const useClient = (cb) => {
  if (import.meta.client) {
    cb();
  }
};
