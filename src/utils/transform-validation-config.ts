import { ValidationRule, ValidationRules } from "../types";

export const transformValidationConfig = <T>(
  validationRulesConfig: ValidationRules<T>
): Partial<Record<keyof T, ValidationRule<T>[]>> => {
  return Object.fromEntries(
    Object.entries(validationRulesConfig).map(([key, rulesArray]) => [
      key,
      (rulesArray as ValidationRule<T>[]).flatMap((rule) => {
        // Map each rule to ensure all roles have a message
        return Object.entries(rule)
          .map(([role, value]) => {
            if (role !== "message") {
              return {
                [role]: value,
                message: (rule as ValidationRule<T>).message || "",
              };
            }
            return null; // Skip the message property itself
          })
          .filter(Boolean) as ValidationRule<T>[]; // Remove null values
      }),
    ])
  ) as Partial<Record<keyof T, ValidationRule<T>[]>>;
};
