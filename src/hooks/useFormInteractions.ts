import { useCallback, useMemo, useState } from "react";
import { onBlur, onChange, onSubmit } from "../handle-event";
import {
  ChangeEvent,
  FormReturnType,
  FormState,
  ValidationRules,
} from "../types";
import { debouncedValidateField } from "../utils/debounced-validate-field";
import { getDefaultFormState } from "../utils/get-default-form-state";
import { transformValidationConfig } from "../utils/transform-validation-config";

const useFormInteractions = <T>(
  initialValues: T,
  validationRulesConfig: ValidationRules<T>
): FormReturnType<T> => {
  const [formState, setFormState] = useState<FormState<T>>(
    getDefaultFormState(initialValues)
  );
  const convertedValidationConfig = transformValidationConfig(
    validationRulesConfig
  );

  const resetFormState = useCallback(() => {
    setFormState(getDefaultFormState(initialValues));
  }, [initialValues]);

  const resetFormField = useCallback(
    (fieldName: keyof T) => {
      setFormState((prevState) => ({
        ...prevState,
        values: { ...prevState.values, [fieldName]: initialValues[fieldName] },
        errors: { ...prevState.errors, [fieldName]: "" },
        touched: { ...prevState.touched, [fieldName]: false },
      }));
    },
    [initialValues]
  );

  const debouncedValidateFieldFn = useMemo(
    () => debouncedValidateField(convertedValidationConfig, setFormState),
    [convertedValidationConfig]
  );

  const setFieldValue = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fieldName: keyof T, value: any) => {
      setFormState((prevState) => {
        const newValues = { ...prevState.values, [fieldName]: value };
        const newState = { ...prevState, values: newValues };

        // Debounce the validation call
        debouncedValidateFieldFn(fieldName, newState);

        return newState;
      });
    },
    [debouncedValidateFieldFn]
  );

  const handleChange = useCallback(
    (
      event: ChangeEvent,
      callback?: (value?: string, event?: ChangeEvent) => void
    ) => {
      onChange(event, setFieldValue, callback);
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    (
      event: ChangeEvent,
      callback?: (value?: string, event?: ChangeEvent) => void
    ) => {
      onBlur(
        { event, callback },
        formState,
        convertedValidationConfig,
        setFormState
      );
    },
    [formState, convertedValidationConfig]
  );

  const handleSubmit = useCallback(
    (onSubmitCallback: (values: T) => void) => {
      return onSubmit(
        onSubmitCallback,
        formState,
        convertedValidationConfig,
        setFormState
      );
    },
    [formState, convertedValidationConfig]
  );

  const setErrors = useCallback((errors: Partial<Record<keyof T, string>>) => {
    setFormState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));
  }, []);

  const setTouched = useCallback(
    (touched: Partial<Record<keyof T, boolean>>) => {
      setFormState((prevState) => ({
        ...prevState,
        touched: {
          ...prevState.touched,
          ...touched,
        },
      }));
    },
    []
  );

  const setSubmitting = useCallback((submitting: boolean) => {
    setFormState((prevState) => ({
      ...prevState,
      isSubmitting: submitting,
    }));
  }, []);

  return {
    formState: {
      values: formState.values,
      errors: formState.errors,
      touched: formState.touched,
    },
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    resetFormField,
    resetFormState,
    isValid: formState.isValid,
    setErrors,
    setTouched,
    isSubmitting: formState.isSubmitting,
    setSubmitting,
  };
};

export default useFormInteractions;
