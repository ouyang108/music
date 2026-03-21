export const useClient = (cb) => {
  if (import.meta.client) {
    console.log(
      "%c[Client Log]",
      "color: #42b883; font-weight: bold;",
      ...args,
    );
  }
};
