import { FormState, OnSubmitCallbackType } from "../types";
import { deepClone, getErrorsFromParams, mapStateToKeys } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onSubmit = <T extends Record<string, any>>(
  e: React.FormEvent<HTMLFormElement>,
  cb: (formState: OnSubmitCallbackType<T>) => void,
  state: FormState<T>,
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>,
  getErrors: ReturnType<typeof getErrorsFromParams<T>>
) => {
  e.preventDefault();

  const { errors, hasError, values } = getErrors;
  const touched = mapStateToKeys(state, "touched");
  const focused = mapStateToKeys(state, "focused");
  const isDirty = mapStateToKeys(state, "isDirty");

  const prevState = deepClone(state);

  if (hasError) {
    Object.keys(errors).forEach((key) => {
      prevState[key].error = errors[key] || "";
    });

    setState(prevState);
  }

  cb({
    hasError,
    errors,
    values,
    touched,
    focused,
    isDirty,
  });
};
