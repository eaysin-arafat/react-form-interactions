import { ChangeEvent } from "./event";

export type ReturnFormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
};

export interface FormReturnType<T> {
  formState: ReturnFormState<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (fieldName: keyof T, value: any) => void;
  handleChange: (
    event: ChangeEvent,
    callback?: (value?: string, event?: ChangeEvent) => void
  ) => void;
  handleBlur: (
    event: ChangeEvent,
    callback?: (value?: string, event?: ChangeEvent) => void
  ) => void;
  handleSubmit: (
    onSubmitCallback: (values: T) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  resetFormField: (fieldName: keyof T) => void;
  resetFormState: () => void;
  isValid: boolean;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
  isSubmitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}
