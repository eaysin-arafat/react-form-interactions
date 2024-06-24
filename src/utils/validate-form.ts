import { FormState, ValidationRule } from "../types";
import { validateField } from "./validate-field";

const validateForm = async <T>(
  formState: FormState<T>,
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
): Promise<boolean> => {
  const newErrors: Partial<Record<keyof T, string>> = {};

  for (const fieldName of Object.keys(validationRulesConfig) as (keyof T)[]) {
    const error = await validateField(
      fieldName,
      formState,
      validationRulesConfig
    );
    if (error) {
      newErrors[fieldName] = error;
    }
  }

  setFormState((prevState) => ({
    ...prevState,
    errors: newErrors,
  }));

  const isValid = Object.keys(newErrors).length === 0;

  return isValid;
};

export default validateForm;
