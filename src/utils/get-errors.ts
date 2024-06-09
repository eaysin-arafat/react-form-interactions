/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormErrors, FormState, UseFormProps } from "../types";
import { mapStateToKeys } from "./map-state-to-keys";
import { isObjEmpty } from "./object-utils";

export const getErrorsFromParams = <T extends Record<string, any>>(
  state: FormState<T>,
  validator: UseFormProps<T>["validator"]
): FormErrors<T> => {
  const values = mapStateToKeys(state, "value") as T;

  let errors: Partial<T> = {};
  let hasError = false;

  if (typeof validator === "function") {
    errors = validator(values) as Partial<T>;
    hasError = !isObjEmpty(errors);
  } else if (typeof validator === "boolean") {
    hasError = validator;
    errors = mapStateToKeys(state, "error") as Partial<T>;
  } else {
    throw new Error("validate property must be boolean or function");
  }

  return {
    values,
    errors,
    hasError,
  };
};
