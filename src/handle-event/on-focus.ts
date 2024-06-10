import { Callback, ChangeEventType, FormState } from "../types";
import { validateCallback } from "../utils";

export const onFocus = <T>(
  e: ChangeEventType,
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  callback?: Callback
) => {
  const { name } = e.target;

  if (callback) {
    validateCallback(callback, e);
  }

  setState((prevState) => ({
    ...prevState,
    [name]: {
      ...prevState[name as keyof FormState<T>], // Assert 'name' as keyof FormState<T>
      focused: true,
      touched: true,
    },
  }));
};
