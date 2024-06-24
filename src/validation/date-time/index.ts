/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../../types/validations";

// Date and time validation rules
export const dateAndTimeValidation: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  date: (value) => !isNaN(Date.parse(value)),
  dateTime: (value) => !isNaN(Date.parse(value)),
  time: (value, rule) => {
    const format =
      rule.time?.hourFormat === "hour24"
        ? /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
        : /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    return format.test(value);
  },
};
