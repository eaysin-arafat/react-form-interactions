/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../../types/validations";

// General validation rules for presence, nullability, and string operations
export const presenceAndStringOperations: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  required: (value, rule) => (rule.required ? !!value : true),
  nullable: (value, rule) => (rule.nullable ? value !== null : true),
  optional: () => true,
  allowEmpty: () => true,
  maxLength: (value, rule) =>
    typeof value === "string" && value?.length <= (rule.maxLength ?? Infinity),
  minLength: (value, rule) =>
    typeof value === "string" && value?.length >= (rule.minLength ?? 0),
  pattern: (value, rule) =>
    rule.pattern ? new RegExp(rule.pattern).test(value) : true,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  numeric: (value) => /^[0-9]+$/.test(value),
  alphanumeric: (value) => /^[a-z0-9]+$/i.test(value),
  matches: (value, rule) => {
    if (typeof rule.matches === "object" && rule.matches.regex) {
      return rule.matches.regex.test(value);
    }
    return value === rule.matches;
  },
  trim: (value, rule) => (rule.trim ? value.trim() : value),
  lowercase: (value, rule) => (rule.lowercase ? value.toLowerCase() : value),
  uppercase: (value, rule) => (rule.uppercase ? value.toUpperCase() : value),
};
