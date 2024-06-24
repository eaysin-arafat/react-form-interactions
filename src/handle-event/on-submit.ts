import { FormEvent } from "../types";
import { FormState } from "../types/form-state";
import { ValidationRule } from "../types/validations";
import validateForm from "../utils/validate-form";

export const onSubmit = <T>(
  onSubmitCallback: (values: T) => void,
  formState: FormState<T>,
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
) => {
  return async (event: FormEvent) => {
    event.preventDefault();

    setFormState((prevState) => ({
      ...prevState,
      isSubmitting: true,
    }));

    const isValid = await validateForm(
      formState,
      validationRulesConfig,
      setFormState
    );

    if (isValid) {
      onSubmitCallback(formState.values); // Call onSubmit callback with form values
    }

    setFormState((prevState) => ({
      ...prevState,
      isSubmitting: false,
    }));
  };
};

export default onSubmit;
