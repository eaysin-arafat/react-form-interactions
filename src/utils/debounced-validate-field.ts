import debounce from "lodash.debounce";
import { FormState, ValidationRule } from "../types";
import { getFieldValidationDependencies } from "./get-field-validation-dependencies";
import { validateField } from "./validate-field";

export const debouncedValidateField = <T>(
  fieldName: keyof T,
  newState: FormState<T>,
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
): void => {
  const validateAndSetErrors = async () => {
    const error = await validateField(
      fieldName,
      newState,
      validationRulesConfig
    );

    setFormState((prevState) => ({
      ...prevState,
      errors: { ...prevState.errors, [fieldName]: error },
    }));

    // Update errors for dependent fields
    const dependencies = getFieldValidationDependencies(
      fieldName,
      validationRulesConfig
    );

    for (const dependentField of dependencies) {
      const dependentError = await validateField(
        dependentField as keyof T,
        newState,
        validationRulesConfig,
        true
      );
      if (newState.touched[dependentField as keyof T]) {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            [dependentField]: newState.touched[dependentField as keyof T]
              ? dependentError
              : "",
          },
        }));
      }
    }
  };

  debounce(validateAndSetErrors, 300)();
};
