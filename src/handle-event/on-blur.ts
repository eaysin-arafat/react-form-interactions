import { CallbackType } from "../types/callback";
import { FormState } from "../types/form-state";
import { ValidationRule } from "../types/validations";
import { validateField } from "../utils/validate-field";

export const onBlur = <T>(
  { event, callback }: CallbackType,
  formState: FormState<T>,
  validationRulesConfig: Partial<Record<keyof T, ValidationRule<T>[]>>,
  setFormState: React.Dispatch<React.SetStateAction<FormState<T>>>
) => {
  const { name, value } = event.target;

  validateField(name as keyof T, formState, validationRulesConfig).then(
    (error) => {
      console.log({ error });

      setFormState((prevState) => ({
        ...prevState,
        touched: { ...prevState.touched, [name]: true },
        errors: { ...prevState.errors, [name]: error },
      }));
    }
  );

  if (callback) callback(value, event);
};

export default onBlur;
