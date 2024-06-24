/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../../types/validations";

// Validation rules related to numeric values and constraints e
export const numericValidation: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  maxValue: (value, rule) => parseFloat(value) <= (rule.maxValue ?? Infinity),
  minValue: (value, rule) => parseFloat(value) >= (rule.minValue ?? 0),
  lessThan: (value, rule) => parseFloat(value) < (rule.lessThan ?? Infinity),
  moreThan: (value, rule) => parseFloat(value) > (rule.moreThan ?? 0),
  positive: (value) => parseFloat(value) > 0,
  negative: (value) => parseFloat(value) < 0,
  integer: (value) => Number.isInteger(parseFloat(value)),
  truncate: (value, rule) =>
    rule.truncate ? Math.trunc(parseFloat(value)) : value,
  round: (value, rule) =>
    rule.round ? Math[rule.round](parseFloat(value)) : value,
  decimalPlaces: (value, rule) =>
    new RegExp(`^\\d*(\\.\\d{0,${rule.decimalPlaces ?? Infinity}})?$`).test(
      value
    ),
  base: (value, rule) => {
    const base = rule.base ?? 10;
    return parseInt(value, base).toString(base) === value.toString(base);
  },
  evenOnly: (value) => parseFloat(value) % 2 === 0,
  divisibleBy: (value, rule) =>
    parseFloat(value) % (rule.divisibleBy ?? 1) === 0,
  equals: (value, rule) => value === rule.equals,
};
