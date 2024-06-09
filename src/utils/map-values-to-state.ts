import { FormState } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapValuesToState = <T extends Record<string, any>>(
  values: T,
  shouldClear: boolean = false
): FormState<T> =>
  Object.keys(values).reduce((acc, key) => {
    acc[key as keyof T] = {
      value: shouldClear ? "" : values[key],
      error: "",
      focused: false,
      touched: false,
      isDirty: false,
    };

    return acc;
  }, {} as FormState<T>);
