import { FormState } from "../types";

export const getDefaultFormState = <T>(initialValues: T): FormState<T> => ({
  values: initialValues,
  errors: {},
  touched: {},
  isValid: true, // Initially true or false based on your validation logic
  isSubmitting: false, // Initially false
});
