/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../types/validations";
import { booleanAndMiscellaneous } from "./boolean-miscellaneous";
import { dateAndTimeValidation } from "./date-time";
import { fileValidation } from "./file";
import { numericValidation } from "./number";
import { presenceAndStringOperations } from "./string/presence-string-sperations";
import { stringManipulationAndPatterns } from "./string/string-manipulation-patterns";

// Combine all validation categories into a single object
const validationRules: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  ...presenceAndStringOperations,
  ...stringManipulationAndPatterns,
  ...numericValidation,
  ...dateAndTimeValidation,
  ...fileValidation,
  ...booleanAndMiscellaneous,
};

// Export the combined validation rules
export { validationRules };
