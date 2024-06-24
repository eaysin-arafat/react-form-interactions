/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../../types/validations";

// Validation rules related to string manipulation and patterns
export const stringManipulationAndPatterns: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  startsWith: (value, rule) =>
    typeof value === "string" && value.startsWith(rule.startsWith ?? ""),
  endsWith: (value, rule) =>
    typeof value === "string" && value.endsWith(rule.endsWith ?? ""),
  phone: (value) => /^\+?[1-9]\d{1,14}$/.test(value),
  creditCard: (value) =>
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2(?:014|149)[0-9]{11}|(2131|1800|35\d{3})\d{11})$/.test(
      value
    ),
  password: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value),
  fieldMatch: (value, rule, formState) =>
    value === formState.values[rule.fieldMatch ?? ""],
  alpha: (value) => /^[a-zA-Z]+$/.test(value),
  base32: (value) => /^[A-Z2-7]+=*$/.test(value),
  base58: (value) => /^[1-9A-HJ-NP-Za-km-z]+$/.test(value),
};
