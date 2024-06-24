/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "../../types/validations";

// File validation rules
export const fileValidation: Record<
  string,
  (
    value: any,
    rule: ValidationRule<any>,
    formState: any
  ) => boolean | Promise<boolean> | { isValid: boolean; message?: string }
> = {
  fileType: (value, rule) => {
    if (!rule.fileType) return true;
    const fileExtension = value.split(".").pop();
    return rule.fileType.includes(fileExtension ?? "");
  },
  fileSize: (value, rule) => value.size <= (rule.fileSize ?? Infinity),
};
