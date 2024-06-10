// handleChange.ts
import { Callback, FormState } from "../types";
import { validateCallback } from "../utils";

export const onChange = <T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  callback: Callback | undefined,
  setState: React.Dispatch<React.SetStateAction<FormState<T>>>
) => {
  const { name: key, value, type } = e.target;
  let updateValue;

  if (type === "checkbox") {
    updateValue = (e.target as HTMLInputElement).checked;
  } else {
    updateValue = value;
  }

  if (callback) {
    validateCallback(callback, e);
  }

  setState((prevState) => {
    const wasDirty = prevState[key as keyof T]?.isDirty || false;

    let isDirty;
    if (type === "checkbox") {
      isDirty = wasDirty || (e.target as HTMLInputElement).checked;
    } else {
      isDirty = wasDirty || value.length > 0;
    }

    return {
      ...prevState,
      [key]: {
        ...prevState[key as keyof T],
        value: updateValue,
        isDirty,
      },
    };
  });
};
