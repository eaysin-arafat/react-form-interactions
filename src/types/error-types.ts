export type FormErrors<T> = {
  values: T;
  errors: Partial<T>;
  hasError: boolean;
};
