export type UseFormParams<T> = {
  initialValue: T;
  validator?:
    | boolean
    | ((values: T) => { [K in keyof T]?: string } | Partial<T>);
};
