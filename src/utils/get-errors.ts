/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormErrors, FormState, UseFormParams } from "../types";
import { isObjEmpty } from "./object-utils";
import { mapStateToKeys } from "./query-state-to-keys";

export const getErrorsFromParams = <T extends Record<string, any>>(
  state: FormState<T>,
  validator: UseFormParams<T>["validator"]
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
