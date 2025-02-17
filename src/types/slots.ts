export type Slots<T extends string> = {
  [key in T]: () => React.ReactNode;
};
