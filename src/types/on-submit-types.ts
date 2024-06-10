export type OnSubmitCallbackType<T> = {
  hasError: boolean;
  errors: Partial<T> | any;
  values: T;
  touched: Record<string, boolean>;
  focused: Record<string, boolean>;
  isDirty: Record<string, boolean>;
};
