import { ValidationRule } from "../types";

export const getFieldValidationDependencies = <T>(
  fieldName: keyof T,
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>
) => {
  const rules = validationRulesConfig[fieldName] || [];
  const dependencyRules = rules.filter((rule) => rule.revalidateFields);

  if (dependencyRules.length > 0) {
    return dependencyRules.reduce<string[]>((acc, rule) => {
      if (rule.revalidateFields) {
        acc.push(...rule.revalidateFields);
      }

      return acc;
    }, []);
  }
  return [];
};
