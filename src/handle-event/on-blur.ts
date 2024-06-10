import { Callback, ChangeEventType, FormErrors, FormState } from "../types";
import { validateCallback } from "../utils";

export const onBlur = <T>(
  e: ChangeEventType,
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  getErrors: FormErrors<T>,
  callback?: Callback
) => {
  const key = e.target.name;
  const errors = getErrors as unknown as Record<string, string>;

  if (callback) {
    validateCallback(callback, e);
  }

  setState((prevState) => ({
    ...prevState,
    [key as keyof FormState<T>]: {
      ...prevState[key as keyof FormState<T>],
      focused: false,
      error: prevState[key as keyof FormState<T>].touched
        ? errors[key] || ""
        : "",
    },
  }));
};
