/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../../types/validations";

// Boolean and miscellaneous validation rules
export const booleanAndMiscellaneous: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  boolean: (value) => typeof value === "boolean",
  url: (value) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
  checkboxRequired: (value) => value === true,
  asyncCheck: async (value, rule) => {
    if (!rule.asyncCheck) return true;
    const isValid = await rule.asyncCheck(value);
    return isValid;
  },
  custom: async (value, rule, formState) => {
    if (!rule.custom) return true;

    return await rule.custom(value, formState.values);
  },
};
