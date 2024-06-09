/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { Callback, FormState, UseFormProps } from "../types";
import { findFocusedKey } from "../utils/find-focused-key";
import { getErrorsFromParams } from "../utils/get-errors";
import { mapStateToKeys } from "../utils/map-state-to-keys";
import { mapValuesToState } from "../utils/map-values-to-state";
import { deepClone } from "../utils/object-utils";
import { validateCallback } from "../utils/validate-callback";

const useForm = <T extends Record<string, any>>({
  initialValue,
  validator,
}: UseFormProps<T>) => {
  const [state, setState] = useState<FormState<T>>(
    mapValuesToState(initialValue)
  );

  const focusedKey = findFocusedKey(state);
  const getErrors = getErrorsFromParams(state, validator);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      callback?: Callback
    ) => {
      const { name: key, value, type } = e.target;
      let updateValue;

      if (type === "checkbox") {
        updateValue = (e.target as HTMLInputElement).checked;
      } else {
        updateValue = value;
      }

      if (callback) {
        validateCallback(callback, e);
      }

      setState((prevState) => {
        const wasDirty = prevState[key]?.isDirty || false;

        let isDirty;
        if (type === "checkbox") {
          isDirty = wasDirty || (e.target as HTMLInputElement).checked;
        } else {
          isDirty = wasDirty || value.length > 0;
        }

        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            value: updateValue,
            isDirty,
          },
        };
      });
    },
    []
  );

  const handleFocus = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      callback?: Callback
    ) => {
      const { name } = e.target;

      if (callback) {
        validateCallback(callback, e);
      }

      setState((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          focused: true,
          touched: true,
        },
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      callback?: Callback
    ) => {
      const key = e.target.name;
      const { errors } = getErrors;

      if (callback) {
        validateCallback(callback, e);
      }

      setState((prevState) => {
        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            focused: false,
            error: prevState[key].touched ? errors[key] || "" : "",
          },
        };
      });
    },
    [getErrors]
  );

  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      cb: (formState: {
        hasError: boolean;
        errors: Partial<T> | any;
        values: T;
        touched: Record<string, boolean>;
        focused: Record<string, boolean>;
        isDirty: Record<string, boolean>;
      }) => void
    ) => {
      e.preventDefault();

      const { errors, hasError, values } = getErrors;
      const touched = mapStateToKeys(state, "touched");
      const focused = mapStateToKeys(state, "focused");
      const isDirty = mapStateToKeys(state, "isDirty");

      const prevState = deepClone(state);

      if (hasError) {
        Object.keys(errors).forEach((key) => {
          prevState[key].error = errors[key] || "";
        });

        setState(prevState);
      }

      cb({
        hasError,
        errors,
        values,
        touched,
        focused,
        isDirty,
      });
    },
    [getErrors, state]
  );

  const reset = useCallback(() => {
    setState(mapValuesToState(initialValue, true));
  }, [initialValue]);

  useEffect(() => {
    if (!focusedKey) return;

    const prevState = deepClone(state);
    const { errors } = getErrors;
    const isError =
      prevState[focusedKey].touched &&
      prevState[focusedKey].isDirty &&
      errors[focusedKey];

    if (isError) {
      prevState[focusedKey].error = errors[focusedKey] || "";
    } else {
      prevState[focusedKey].error = "";
    }

    setState(prevState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state[focusedKey]?.value]);

  return {
    formState: state,
    handleSubmit,
    handleChange,
    handleFocus,
    handleBlur,
    reset,
  };
};

export default useForm;
