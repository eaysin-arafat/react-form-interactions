import { FormState, ValidationRule } from "../types";
import { debounce } from "./debounce";
import { validateField } from "./validate-field";

export const debouncedValidateField = <T>(
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
): ((fieldName: keyof T, newState: FormState<T>) => void) => {
  return debounce(
    async (fieldName: keyof T, newState: FormState<T>) => {
      const error = await validateField(
        fieldName,
        newState,
        validationRulesConfig
      );
      // Update errors only if there's a change
      if (newState.errors[fieldName] !== error) {
        setFormState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, [fieldName]: error },
        }));
      }
    },
    300 // Adjust the debounce delay as needed
  );
};
