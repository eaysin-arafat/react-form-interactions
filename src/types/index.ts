export type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string;
    isDirty: boolean;
    focused: boolean;
    touched: boolean;
  };
};

export type UseFormProps<T> = {
  initialValue: T;
  validator?:
    | boolean
    | ((values: T) => { [K in keyof T]?: string } | Partial<T>);
};

export type FormErrors<T> = {
  values: T;
  errors: Partial<T>;
  hasError: boolean;
};

export type Callback = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;
