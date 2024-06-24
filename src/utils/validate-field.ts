import { defaultMessages } from "../default-message";
import { FormState, ValidationRule } from "../types";
import { validationRules } from "../validation";

type ValidationRuleKeys<T> = keyof ValidationRule<T>;

export const validateField = async <T>(
  fieldName: keyof T,
  state: FormState<T>,
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>,
  customOnly = false
) => {
  const fieldValidationRules = validationRulesConfig[fieldName];

  if (!fieldValidationRules) {
    return ""; // or handle the absence of validation rules as needed
  }

  let errorMessage: string = "";

  for (const rule of fieldValidationRules) {
    if (customOnly && !rule.custom) continue; // Skip non-custom rules if customOnly is true

    const ruleType = Object.keys(rule).find(
      (key) => validationRules[key as keyof typeof validationRules]
    ) as ValidationRuleKeys<T> | undefined;

    if (ruleType) {
      const isValid = await validationRules[ruleType](
        state.values[fieldName],
        rule,
        state
      );

      const messageOrFunction =
        defaultMessages[ruleType as keyof typeof defaultMessages];

      const message =
        typeof messageOrFunction === "function"
          ? messageOrFunction(rule[ruleType])
          : messageOrFunction;

      if (!isValid) {
        errorMessage = rule.message || message || "";
        break;
      }
    }
  }

  return errorMessage;
};
