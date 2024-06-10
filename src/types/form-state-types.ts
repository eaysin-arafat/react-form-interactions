export type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string;
    isDirty: boolean;
    focused: boolean;
    touched: boolean;
  };
};
